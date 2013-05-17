/*
 * Fading Collapsible Plugin 1.0
 *
 * Copyright 2013 Dan Covill
 * Released under MIT License 
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

(function( $ ) {
	$.fn.fadingCollapsible = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.fadingCollapsible' );
		}
	};

	function hexToRGB(input) {
		var result;
		if(input.substr(0,1) !== '#') {
			throw "Error converting hex to rgb, bad format";
		}
		if(input.length === 4) {
			var r = parseInt(input.substring(1,2) + input.substring(1,2), 16);
			var g = parseInt(input.substring(2,3) + input.substring(2,3),16);
			var b = parseInt(input.substring(3,4) + input.substring(3,4),16);
			result = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		} else if (input.length === 7) {
			var r = parseInt(input.substring(1,3),16);
			var g = parseInt(input.substring(3,5),16);
			var b = parseInt(input.substring(5,7),16);
			result = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		} else {
			throw "Error converting hex to rgb, bad format";
		}
		return result;
	}

	function rgbToHex(input) {
		var parts = input.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		delete(parts[0]);
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]).toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		} 
		return parts.join('');
	}

	function colorToRGB(input) {
		/*if the incoming color has transparency this method will assume there's a white underlay, 
		 * if you want this to work on other backgrounds you'll need to modify the 255 added to 
		 * each of r, g, b, and a below to be the rgb values of the color behind your current 
		 * color. (As opposed to the 255 I'm adding to each of r, g, and b). If THAT one is also
		 * transparent, you'll need to take that into account in your calculations as well.
		 * http://stackoverflow.com/questions/2049230/convert-rgba-color-to-rgb
		*/
		if(input.substr(0,1) === '#') {
			return hexToRGB(input);
		}

		if(input === 'transparent') {
			return 'rgb(255,255,255)';
		}

		if(input.substr(0,4) === 'rgb(') {
			return input;
		}
		var re = new RegExp(/[^\d]+(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([^\)]*)\)/g);

		var r = input.replace(re, '$1');
		var g = input.replace(re, '$2');
		var b = input.replace(re, '$3');
		var a = input.replace(re, '$4');

		r = Math.round(((1 - a) * 255) + (a * r));
		g = Math.round(((1 - a) * 255) + (a * g));
		b = Math.round(((1 - a) * 255) + (a * b));

		input = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		return input;
	}

	var methods = {
		init : function(options) {
			return this.each(function() {
				var $this = $(this),
						data = $this.data('fadingCollapsible');
	
				if(!data) {
					var originalSettings = {
						'height': $this.height(),
						'overflow': $this.css('overflow'),
						'position': $this.css('position'),
						'padding-bottom': $this.css('padding-bottom'),
						'background-color': $this.css('background-color'),
						'background': $this.css('background'),
						'display': $this.css('display') 
					}
	
					if($this.css('background-image') !== 'none') {
						console.log("Background images are not supported by the fadingCollapsible plugin");
						return;
					}
					if($this.css('background-color').substr(0,4) == 'rgba') {
						console.log("Divs with transparent backgrounds are not supported by the fadingCollapsible plugin");
						console.log("Making background opaque");
					}
					
					var settings = {
						'closed-height': '100px',
						'more-button-url': 'BluePlusIcon_20x20.png',
						'less-button-url': 'BlueMinusIcon_20x20.png',
						'more-button-text': 'more',
						'less-button-text': 'less',
						'button-class': 'fauxLink',
						'background-color-rgb': colorToRGB(originalSettings['background-color']),
						'opened': false
					};

					if(options) { $.extend(settings, options); }

					//set up the closed/opened state
					if(settings['opened']) {
						$this.css({
							'position': 'relative', 
							'background-color': settings["background-color-rgb"],
							'padding-bottom': parseInt(originalSettings['padding-bottom']) + 35 + 'px'
						});
					} else {
						$this.css({
							'position': 'relative', 
							'height': settings["closed-height"], 
							'background-color': settings["background-color-rgb"],
							'overflow': 'hidden'
						});
					}
	
					var fadeColorString = settings["background-color-rgb"].substring(0, settings["background-color-rgb"].length - 1).replace('rgb','rgba');
					//calculate the background fade
					var background = 'linear-gradient(to bottom, ' + fadeColorString + ',0.0) 0%,' + fadeColorString + ',1.0) 100%)';
					var userAgent = navigator.userAgent.toLowerCase(); 
					if (userAgent.indexOf('safari') != -1){ 
						if(userAgent.indexOf('chrome') <= -1){
							//safari fix
							background = '-webkit-linear-gradient(top, ' + fadeColorString + ',0.0) 0%,' + fadeColorString + ',1.0) 100%)';
						}
					}
					
					//calculate the z-index of the plugin elements
					var pluginZIndex;
					if(isNaN($this.css('z-index'))) {
						pluginZIndex = 1;
					} else {
						pluginZIndex = parseInt($this.css("z-index")) + 1
					}
		
					var borderLeftWidth = parseInt($this.css("border-left-width"));
					if(isNaN(borderLeftWidth)) {
						borderLeftWidth = 0;
					}
					var borderRightWidth = parseInt($this.css("border-right-width"));
					if(isNaN(borderRightWidth)) {
						borderRightWidth = 0;
					}
					//create the fade div
					var fadeDiv = $('<div />', { 
						'class':'textFade',
						css: {
							'position': 'absolute',
							'bottom': '30px',
							'left': '0',
							'z-index': pluginZIndex,
							'width': $this.outerWidth() - borderLeftWidth - borderRightWidth + 'px',
							'height': '50px',
							'background-image': background
						}
					});
					if($.browser.msie && $.browser.version < 10) {
						var stupidIEColor = rgbToHex(settings["background-color-rgb"]);
						fadeDiv.css({ 
							'zoom': '1',
							'background': 'none',
							'-ms-filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00' + stupidIEColor + ',endColorstr=#ff' + stupidIEColor + ')',
							'filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00' + stupidIEColor + ',endColorstr=#ff' + stupidIEColor + ')'
						});
					}
					if(!settings['opened']) { fadeDiv.appendTo($this); }		

					//add the more/less button and related items
					var controlDiv = $('<div />', {
						'class':'collapseButton',
						css: {
							'position': 'absolute',
							'bottom': '0',
							'left': '0',
							'padding-left': $this.css('padding-left'),
							'z-index': pluginZIndex,
							'height': '30px',
							'width': $this.outerWidth() - borderLeftWidth - borderRightWidth - parseInt($this.css('padding-left')) + 'px',
							'line-height': '20px',
							'cursor': 'pointer',
							'background-color': settings["background-color-rgb"]
						},
						click: function() {
							methods.toggle($(this.parentElement));
						},
						resize: function() {
							methods.update($(this.parentElement));
						}
					}).appendTo($this);
		
					var controlText;
					var controlIconPath;
					if(settings['opened']) {
						controlText = settings["less-button-text"];
						controlIconPath = settings["less-button-url"];
					} else {
						controlText = settings["more-button-text"];
						controlIconPath = settings["more-button-url"];
					}
					var controlTextSpan = $('<span />', {
						text: controlText,
						css: {
							'margin-left': '5px',
							'vertical-align': 'top'
						},
						'class': settings['button-class']
					}).appendTo(controlDiv);
	
					var controlIcon = $('<img />', {
						src: controlIconPath,
						alt: controlText
					}).prependTo(controlDiv);

					$this.data('fadingCollapsible', {
						target: $this,
						fadeDiv: fadeDiv,
						controlDiv: controlDiv,
						controlIcon : controlIcon,
						controlTextSpan : controlTextSpan,
						settings: settings,
						originalSettings: originalSettings
					});
				}
			});
		},
		destroy : function() {
			return this.each(function() {
				var $this = $(this),
						data = $this.data('fadingCollapsible');

				data.fadeDiv.remove();
				data.controlDiv.remove();
				data.target.css({
					'position':data.originalSettings['position'],
					'height':data.originalSettings['height'],
					'background':data.originalSettings['background'],
					'overflow':data.originalSettings['overflow']
				});
				$this.removeData('fadingCollapsible');
			});
		},
		toggle : function(obj) {
			if(obj.data('fadingCollapsible').settings.opened) {
				methods.collapse(obj);
			} else {
				methods.expand(obj);
			}
		},
		expand : function(obj) {
			var fadingCollapsible = obj.data('fadingCollapsible');
			obj.css('overflow', fadingCollapsible.originalSettings['overflow']);
			obj.animate({
				'height':fadingCollapsible.originalSettings['height'],
				'padding-bottom':parseInt(fadingCollapsible.originalSettings['padding-bottom']) + 35 + 'px'
			}, 500, function() {
				fadingCollapsible.fadeDiv.detach();
				fadingCollapsible.controlIcon.attr('src', fadingCollapsible.settings['less-button-url']);
				fadingCollapsible.controlTextSpan.text(fadingCollapsible.settings['less-button-text']);
			});
			fadingCollapsible.settings.opened = true;
		},
		collapse : function(obj) {
			var fadingCollapsible = obj.data('fadingCollapsible');
			fadingCollapsible.fadeDiv.insertBefore(fadingCollapsible.controlDiv);
			fadingCollapsible.controlIcon.attr('src', fadingCollapsible.settings['more-button-url']);
			fadingCollapsible.controlTextSpan.text(fadingCollapsible.settings['more-button-text']);
			obj.animate({
				'height':fadingCollapsible.settings['closed-height'],
				'padding-bottom':fadingCollapsible.originalSettings['padding-bottom']
			}, 500, function() { 
				obj.css('overflow','hidden'); 
			});
			fadingCollapsible.settings.opened = false;
		},
		update : function(obj) {
			//TODO: set it up so if this resizes, the fade does too
			
			//scenarios to refresh:
			//z-index change
			//size change
			//background color change
		}
	};
})( jQuery );
