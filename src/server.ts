import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  app.get("/filteredimage", async (req, res ) => {
    console.log('processing restful endpoint: /filteredimage');
    let { image_url } = req.query;
    console.log('get image_url value from request parameter: ' + image_url);
    
    if (!image_url) {
      console.log('image_url was not provided in request parameter!');
      return res.status(400).send({ error: 'A valid Image URL paramter [image_url] is required' });
    } else {
      console.log('image_url was provided to process:  ' + image_url);
      let filteredpath = await filterImageFromURL(image_url);       
      res.sendFile(filteredpath, () => {
      console.log('time to clean up ... deleting image file.')
      deleteLocalFiles([filteredpath]);
      console.log('successfully deleted the image file');
    });
    res.status(200);
    }
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();