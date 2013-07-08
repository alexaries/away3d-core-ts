///<reference path="ParserBase.ts" />
///<reference path="ParserDataFormat.ts" />
///<reference path="ParserLoaderType.ts" />
///<reference path="../../net/IMGLoader.ts" />

module away.loaders
{

	/**
	 * ImageParser provides a "parser" for natively supported image types (jpg, png). While it simply loads bytes into
	 * a loader object, it wraps it in a BitmapDataResource so resource management can happen consistently without
	 * exception cases.
	 */
	export class ImageParser extends away.loaders.ParserBase
	{
		//private var _byteData         : ByteArray;
		private _startedParsing         : boolean;
		private _doneParsing            : boolean;
		//private var _loader           : Loader;

		/**
		 * Creates a new ImageParser object.
		 * @param uri The url or id of the data or file to be parsed.
		 * @param extra The holder for extra contextual data that the parser might need.
		 */
		constructor()
		{

			super( away.loaders.ParserDataFormat.IMAGE , away.loaders.ParserLoaderType.IMG_LOADER );

		}

		/**
		 * Indicates whether or not a given file extension is supported by the parser.
		 * @param extension The file extension of a potential file to be parsed.
		 * @return Whether or not the given file type is supported.
		 */

		public static supportsType(extension : string) : boolean
		{

			extension = extension.toLowerCase();
			return extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif" || extension == "bmp";//|| extension == "atf";

		}

		/**
		 * Tests whether a data block can be parsed by the parser.
		 * @param data The data block to potentially be parsed.
		 * @return Whether or not the given data is supported.
		 */
		public static supportsData(data : any) : boolean
		{

            if ( data  instanceof HTMLImageElement )
            {

                return true;
            }

            return false;

            /*
			//shortcut if asset is IFlexAsset
			if (data is Bitmap)
				return true;
				
			if (data is BitmapData)
				return true;

			if (!(data is ByteArray))
				return false;

			var ba : ByteArray = data as ByteArray;
			ba.position = 0;
			if (ba.readUnsignedShort() == 0xffd8)
				return true; // JPEG, maybe check for "JFIF" as well?

			ba.position = 0;
			if (ba.readShort() == 0x424D)
				return true; // BMP

			ba.position = 1;
			if (ba.readUTFBytes(3) == 'PNG')
				return true;

			ba.position = 0;
			if (ba.readUTFBytes(3) == 'GIF' && ba.readShort() == 0x3839 && ba.readByte() == 0x61)
				return true;
			
			ba.position = 0;
			if (ba.readUTFBytes(3) == 'ATF')
				return true;
				
			return false;
			*/
		}

		/**
		 * @inheritDoc
		 */
		public _pProceedParsing() : boolean
		{

            if ( this.data  instanceof HTMLImageElement )
            {

                // TODO: Implement Texture2D and add HTMLImageElement
                var aAssetTest : away.library.IAsset ;

                this._pFinalizeAsset( aAssetTest , this._iFileName);

                return away.loaders.ParserBase.PARSING_DONE;

            }

            return away.loaders.ParserBase.PARSING_DONE;

            /*
			var asset:Texture2DBase;
			if (_data is Bitmap) {
				asset = new BitmapTexture(Bitmap(_data).bitmapData);
				finalizeAsset(asset, _fileName);
				return PARSING_DONE;
			}
			
			if (_data is BitmapData)
			{
				asset = new BitmapTexture(_data as BitmapData);
				finalizeAsset(asset, _fileName);
				return PARSING_DONE;
			}

			_byteData = getByteData();
			if (!_startedParsing) {
				_byteData.position = 0;
				_loader = new Loader();
				_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoadComplete);
				_loader.loadBytes(_byteData);
				_startedParsing = true;
			}

			return _doneParsing;
			*/
		}

        // Not needed - AS3, Loader.loadBytes functionality

		/**
		 * Called when "loading" is complete.
         */

        /*
		private onLoadComplete(event : Event) : void
		{
			var bmp : BitmapData = Bitmap(_loader.content).bitmapData;
			var asset : BitmapTexture;
			
			_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE, onLoadComplete);

			if (!TextureUtils.isBitmapDataValid(bmp)) {
				var bmdAsset:BitmapDataAsset = new BitmapDataAsset(bmp);
				bmdAsset.name = _fileName;
				
				dispatchEvent(new AssetEvent(AssetEvent.TEXTURE_SIZE_ERROR, bmdAsset));
				
				bmp = new BitmapData(8, 8, false, 0x0);
		
				//create chekerboard for this texture rather than a new Default Material
				var i:number, j:number;
				for (i=0; i<8; i++) {
					for (j=0; j<8; j++) {
						if ((j & 1) ^ (i & 1))
							bmp.setPixel(i, j, 0XFFFFFF);
					}
				}
			}
			
			asset = new BitmapTexture(bmp);
			finalizeAsset(asset, _fileName);
			_doneParsing = true;
		}
        */
	}
}