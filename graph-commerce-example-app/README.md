# Example app for product listing on Foundation data, using NextJs
This project is creating a product listing with facets and search capabilities for data that comes from the Foundation example site.

## Starting the application

### Start Foundation site
You have to setup Foundation and run the Foundation example site to get images working. The reason for this is that images will be received from the actual CMS, and we need to have a CMS running to receive the images

### Start application
1. Install all dependencies: npm install
2. Start codegen, to have it checking your typescript files, in case you want to update any query: npm run codeyen
3. Build the application: npm run build
4. Start the application: npm run dev
