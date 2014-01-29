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
						'animation-duration': '1000'
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
					var comic_navmap = $('<map/>', {
						'name': 'comic_navmap'
					});
					comic_player.append(comic_viewport);
					comic_viewport.append(comic_page);
					comic_viewport.append(comic_navmap);

					var comic_data;
					//pull data from json data and load first panel
					$.getJSON(settings['cell-collection'], function(jsonData, textStatus) {
						comic_data = jsonData.panels;
						
						$this.data('comicPlayer', {
							comic_player: $this,
							settings: settings,
							comic_viewport: comic_viewport,
							comic_page: comic_page,
							comic_navmap : comic_navmap,
							image_preload: image_preload,
							comic_data: comic_data
						});

						root_node = methods.display_panel(comic_player, jsonData.panels[0].id);
					});

					//clicking the mapped area loads up the new image and scrolls
					comic_player.on('click', 'map>area', function() { 
						methods.display_panel($this, $(this).data('destination'));
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
			var current_images = comicPlayer.comic_page.find('img');
			if(current_images.length > 1) {
				var prevImage = $(current_images[current_images.length - 2]);
				var prevImageName = prevImage.data('name');

				var matching_panels = $.grep(comicPlayer.comic_data, function(element, index) { 
					return element.id === prevImageName;
				});

				loadMap(comicPlayer.comic_navmap, matching_panels[0].destinations, comicPlayer.image_preload);

				comicPlayer.comic_page.animate({
					'top': -(prevImage.position().top) + 'px',
					'left': -(prevImage.position().left) + 'px'
				}, comicPlayer.settings['animation-duration'], function() { 
					current_images[current_images.length - 1].remove();
				});
			}
		},
		display_panel : function(obj, name) {
			var comicPlayer = obj.data('comicPlayer');
			var matching_panels = $.grep(comicPlayer.comic_data, function(element, index) { 
				return element.id === name;
			});
			if(!!matching_panels[0] && matching_panels.length === 1) {
				//load the image into the comic pane
				var current_image = $('<img />', {
					'src': matching_panels[0].src,
					'data-name': matching_panels[0].id,
					'usemap': '#comic_navmap',
					'width': '780',
					'height': '480',
					'alt': 'Comic panel',
					'css': {
						'height': '480',
						'width': '780',
						'margin': comicPlayer.settings['cell-margin'],
						'border': comicPlayer.settings['cell-border'],
					}
				});
				comicPlayer.comic_page.append(current_image);
				loadMap(comicPlayer.comic_navmap, matching_panels[0].destinations, comicPlayer.image_preload);

				//pan the view to the new image
				comicPlayer.comic_page.animate({
					'top': -(current_image.position().top) + 'px',
					'left': -(current_image.position().left) + 'px'
				}, comicPlayer.settings['animation-duration']);
			} else {
				throw 'Data mapping error (jquery.comic.js)';
			}	
		},
	};
	function loadMap(map, destinations, preload) {
		map.empty();

		//pre-load all the possible destination images and load the image map that can trigger them
		image_preload = [];
		$.each(destinations, function(index, element) {
			var preload_image = new Image();
			preload_image.src = destinations[index].src;
			preload.push(preload_image);
			map.append($('<area />', { 
				'shape': destinations[index].shape,
				'coords': destinations[index].coords,
				'href': '#',
				'data-destination': destinations[index].id,
				'class': 'js-panel_shift'
			}));
		});
	}
})( jQuery );
