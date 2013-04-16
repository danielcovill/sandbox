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
      $.error( 'Method ' +  method + ' does not exist on jQuery.fadingCollapsible' );
    }
	};

	function rgbaToRGB(input) {
		//assume white background, if you want this to work on other backgrounds
		//you'll need to modify the 255 added to each of r, g, b, and a below to 
		//be the rgb values of the color behind your current color. (As opposed
		//to the 255 I'm adding to each of r, g, and b)
		if(input.substr(0,4) === 'rgb(') {
			return input;
		}
		var re = new RegExp(/[^\d]+(\d{1,3}), (\d{1,3}), (\d{1,3}), ([^\)]*)\)/g);

		var r = input.replace(re, '$1')/255;
		var g = input.replace(re, '$2')/255;
		var b = input.replace(re, '$3')/255;

		var a = input.replace(re, '$4');
		r = (255 + (((1-a) * r) + (a * r))) * 255;
		g = (255 + (((1-a) * g) + (a * g))) * 255;
		b = (255 + (((1-a) * b) + (a * b))) * 255;

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
						'background-color-rgb': rgbaToRGB(originalSettings['background-color']),
						'opened': false
					};

					if(options) { $.extend(settings, options); }

					//set up the closed/opened state
					if(settings['opened']) {
						$this.css({
							'position': 'relative', 
							'background-color': settings["background-color-rgb"],
							'padding-bottom': parseInt(originalSettings['padding-bottom']) + 35 + 'px',
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
		
					//create the fade div
					var fadeDiv = $('<div />', { 
						class:'textFade',
						css: {
							'position': 'absolute',
							'bottom': '30px',
							'left': '0',
							'z-index': pluginZIndex,
							'width': $this.outerWidth() - parseInt($this.css("border-left-width")) - parseInt($this.css("border-right-width")) + 'px',
							'height': '50px',
							'background-image': background
						}
					});
					if(!settings['opened']) { fadeDiv.appendTo($this); }		

					//add the more/less button and related items
					var controlDiv = $('<div />', {
						class:'collapseButton',
						css: {
							'position': 'absolute',
							'bottom': '0',
							'left': '0',
							'padding-left': $this.css('padding-left'),
							'z-index': pluginZIndex,
							'height': '30px',
							'width': $this.outerWidth() - parseInt($this.css("border-left-width")) - parseInt($this.css("border-right-width")) - parseInt($this.css('padding-left')) + 'px',
							'line-height': '20px',
							'cursor': 'pointer',
							'background-color': settings["background-color-rgb"],
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
						class: settings['button-class']
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
			obj.animate({
				'height':fadingCollapsible.originalSettings['height'],
				'overflow':fadingCollapsible.originalSettings['overflow'],
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
