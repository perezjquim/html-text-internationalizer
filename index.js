(function()
{
	const oCore = {	

		init: function()
		{
			window.addEventListener( "load", function()
			{
				this._fetchConfig()
			}.bind(this))
		},

		_fetchConfig: function()
		{
			fetch( './texts.json' )
			  .then( oResponse => oResponse.json() )
			  .then( oConfig => 
			  {
			  	this._oConfig = oConfig
			  	this._fillText( )
			  })
		},
		
		_fillText: function( oConfig )
		{
			const rExp = new RegExp( /[_][(]['].*['][)]/g )
			var sBody = document.body.innerHTML
			sBody = sBody.replace( rExp, this._replace.bind(this) )
			document.body.innerHTML = sBody
		},

		_replace: function( sMatch, iOffset, sString )
		{
			const sKey = sMatch.replace( '_(\'' , '' ).replace( '\')', '' )
			const sLang = this._getLanguage()
			const sDefaultLang = Object.keys( this._oConfig )[ 0 ]
			const sLangConfig = this._oConfig[ sLang ] || this._oConfig[ sDefaultLang ]

			if( sLangConfig )
			{
				return sLangConfig[ sKey ]
			}
			else
			{
				return sMatch;
			}
		},

		_getLanguage: function()
		{
			return ( ( navigator.languages || [] ) [0] || 
					navigator.userLanguage || 
					navigator.language || 
					navigator.browserLanguage || 
					'en' )
		}		
	}

	oCore.init()
})()