/*
 * Comic Strip Plugin 1.0
 *
 * Copyright 2014 Dan Covill
 * Released under MIT License 
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

(function( $ ) {
	$.fn.comicPlayer = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.comicPlayer' );
		}
	};

	var imgPreload = [];

	var methods = {
		init : function(options) {
			return this.each(function() {
				var $this = $(this), data = $this.data('comicPlayer');

				//clean up middle click when possible
				$('body').on('click', function(e) { 
					if( e.which == 2 ) {
						e.preventDefault();
					}
				});

				if(!data) {

					var settings = {
						'viewport-height': '520px',
						'viewport-width': '820px',
						'page-height': '2000px',
						'page-width': '2200px',
						'page-background': '#FFF',
						'cell-margin': '20px',
						'cell-border': '1px solid #000',
						'cell-collection': 'comic_data.json',
						'animation-duration': '1000',
						'preload': 'next'//next, all, none
					}

					if(options) { $.extend(settings, options); }

					//configure comic player
					var image_preload = [];
					var comic_player = $this;
					var comic_viewport = $('<div/>', {
						'class': 'comic_viewport',
						'css': {
							'height': settings['viewport-height'],
							'width': settings['viewport-width'],
							'overflow': 'hidden',
							'position': 'relative'
						}
					});
					var comic_page = $('<div/>', {
						'class': 'comic_page',
						'css': {
							'height': settings['page-height'],
							'width': settings['page-width'],
							'background': settings['page-background'],
							'position': 'absolute'
						}
					});
					comic_player.append(comic_viewport);
					comic_viewport.append(comic_page);

					var comic_data;
					//pull data from json data and load first panel
					$.getJSON(settings['cell-collection'], function(jsonData, textStatus) {
						comic_data = jsonData.panels;
						
						$this.data('comicPlayer', {
							comic_player: $this,
							settings: settings,
							comic_viewport: comic_viewport,
							comic_page: comic_page,
							image_preload: image_preload,
							comic_data: comic_data
						});

						//preload images if they wanted to preload all the images
						if (settings['preload'] === 'all' && imgPreload.length === 0) {
							for(var i=0;i<comic_data.length;i++) {
								var img = new Image();
								img.src = comic_data[i].src;
								imgPreload.push(img);
								if(typeof comic_data[i].destinations === 'undefined') {
									continue;
								}
								for(var j=0;j<comic_data[i].destinations.length;j++) {
									var img2 = new Image();
									img2.src = comic_data[i].destinations[j].src;
									imgPreload.push(img2);
									if(typeof comic_data[i].destinations[j].alt_images === 'undefined') {
										continue;
									}
									for(var k=0;k<comic_data[i].destinations[j].alt_images.length;k++) {
										var img3 = new Image();
										img3.src = comic_data[i].destinations[j].alt_images[k].src;
										imgPreload.push(img3);
									}
								}
							}
						}

						root_node = methods.display_panel(comic_player, jsonData.panels[0].id);
					});

					//clicking the mapped area loads up the new image and scrolls
					comic_player.on('click', '.support_image', function() { 
						if(!$(this).parent().is('a')) {
							methods.display_panel($this, $(this).data('destination'));
							return false;
						}
					});
					//hover reveals click related elements
					comic_player.on('mouseenter', '.support_container', function() { 
						var imgid = $(this).find('img')[0].id;
						$('#' + imgid).show();
						$('.child_of_' + imgid).show();
						return false;
					});
					comic_player.on('mouseleave', '.support_container', function() { 
						var imgid = $(this).find('img')[0].id;
						$('#' + imgid).hide();
						$('.child_of_' + imgid).hide();
						return false;
					});

				}
			});
		},
		destroy : function() {
			return this.each(function() {
				var $this = $(this), data = $this.data('comicPlayer');
				data.comic_viewport.remove();
				$this.removeData('comicPlayer');
			});
		},
		page_back : function() {
			var comicPlayer = $(this).data('comicPlayer');
			var current_images = comicPlayer.comic_page.find('.comic_cell_frame');
			if(current_images.length > 1) {
				var prevImage = $(current_images[current_images.length - 2]);
				var prevImageName = prevImage.children('img').data('name');

				var matching_panels = $.grep(comicPlayer.comic_data, function(element, index) { 
					return element.id === prevImageName;
				});

				comicPlayer.comic_page.animate({
					'top': -(prevImage.position().top) + 'px',
					'left': -(prevImage.position().left) + 'px'
				}, comicPlayer.settings['animation-duration'], function() { 
					$(current_images[current_images.length - 1]).remove();
				});
			}
		},
		display_panel : function(obj, name) {
			var comicPlayer = obj.data('comicPlayer');
			var matching_panels = $.grep(comicPlayer.comic_data, function(element, index) { 
				return element.id === name;
			});
			if(!!matching_panels[0] && matching_panels.length === 1) {
				if (comicPlayer.settings['preload'] === 'next') {
					throw 'preload:next not yet implemented';
				} else if (comicPlayer.settings['preload'] !== 'all' 
						&& comicPlayer.settings['preload'] !== 'none') {
					throw 'unknown preload setting';
				}
				
				var cell_frame = $('<div />', {
					'class': 'comic_cell_frame',
					'css': {
						'height':comicPlayer.settings['viewport-height'],
						'width':comicPlayer.settings['viewport-width'],
						'position':'relative',
						'float':'left'
					}
				});
				//load the image into the comic pane
				var current_image = $('<img />', {
					'src': matching_panels[0].src,
					'data-name': matching_panels[0].id,
					'alt': 'Comic panel',
					'css': {
						'margin': comicPlayer.settings['cell-margin'],
						'border': comicPlayer.settings['cell-border']
					}
				});
				cell_frame.append(current_image);
				comicPlayer.comic_page.append(cell_frame);
				loadSupportImages(cell_frame, matching_panels[0].destinations);

				//pan the view to the new image
				comicPlayer.comic_page.animate({
					'top': -(cell_frame.position().top) + 'px',
					'left': -(cell_frame.position().left) + 'px'
				}, comicPlayer.settings['animation-duration']);
			} else {
				throw 'Data mapping error (jquery.comic.js)';
			}	
		}
	};
	function loadSupportImages(current_frame, destinations) {
		//load and position all the supporting images
		for(var i=0;i<destinations.length;i++) {
			var element = destinations[i];
			var support_container = $("<div />", {
				'class': 'support_container',
				'css': {
					'left': element.coords.split(',')[0] + 'px',
					'top': element.coords.split(',')[1] + 'px',
					'height': element.height,
					'width': element.width,
					'position': 'absolute',
					'cursor': 'pointer'
				}
			});	
			var support_image = $('<img />', {
				'class': 'support_image',
				'id' : element.id,
				'data-destination': element.destination,
				'src': element.src,
				'alt': element.id,
				'css': {
					'display': 'none'
				}
			})
			if(!!element.exit && element.exit === true) {
				var exit_link = $('<a />', {
					'href': element.destination,
					'target': element.target
				});
				exit_link.append(support_image);
				support_container.append(exit_link);
			} else {
				support_container.append(support_image);
			}
			
			current_frame.append(support_container);
			
			if(!!element.alt_images) {
				for(var j=0;j<element.alt_images.length;j++) {
					var alt_element = element.alt_images[j];
					var support_container_alt = $("<div />", {
						'class': 'support_container_alt',
						'css': {
							'left': alt_element.coords.split(',')[0] + 'px',
							'top': alt_element.coords.split(',')[1] + 'px',
							'height': alt_element.height,
							'width': alt_element.width,
							'position': 'absolute'
						}
					});	
					support_container_alt.append($('<img />', {
						'class': 'support_image_alt' + ' child_of_' + element.id,
						'src': alt_element.src,
						'css': {
							'display': 'none'
						}
					}));
					current_frame.append(support_container_alt);
				}
			}
		}
	}
})( jQuery );
