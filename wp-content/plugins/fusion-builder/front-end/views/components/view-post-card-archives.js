var FusionPageBuilder = FusionPageBuilder || {};

( function() {

	jQuery( document ).ready( function() {

		// Related Component View.
		FusionPageBuilder.fusion_tb_post_card_archives = FusionPageBuilder.fusion_post_cards.extend( {

			onInit: function() {
				var output, markupIsEmpty, markupIsPlaceholder;

				this.filterTemplateAtts = this._filterTemplateAtts( this.filterTemplateAtts );

				output				= this.model.attributes.markup && this.model.attributes.markup.output;
				markupIsEmpty 		= '' === output;
				markupIsPlaceholder = output && output.includes( 'fusion-builder-placeholder' );

				if ( markupIsEmpty || markupIsPlaceholder ) {
					this.model.attributes.markup.output = this.getComponentPlaceholder();
				}
			},

			/**
			 * Modify template attributes.
			 *
			 * @since 3.3
			 * @param {Object} atts - The attributes.
			 * @return {Object}
			 */
			_filterTemplateAtts: function( filterTemplateAtts ) {
				var self = this;
				return function( atts ) {
					atts.params.show_title = 'yes';
					atts = filterTemplateAtts.call( self, atts );
					atts.placeholder = self.getComponentPlaceholder();
					return atts;
				};
			},

			/**
			 * Runs after view DOM is patched.
			 *
			 * @since 3.3
			 * @return {void}
			 */
			afterPatch: function() {
				jQuery( '#fb-preview' )[ 0 ].contentWindow.jQuery( 'body' ).trigger( 'fusion-element-render-fusion_post_cards', this.model.attributes.cid );
			}

		} );
	} );
}( jQuery ) );
