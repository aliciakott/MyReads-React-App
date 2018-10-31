# MyReads Udacity Project

/


## Getting started

Follow these steps to get a copy of the project running on your local machine


### Dependencies

* [Google fonts](http://fonts.googleapis.com/)


### Installing

You will need a Windows, Mac, or Linux based operating system and access to the internet in order to run this project.
Either clone or download and unzip the files to your local directory. After downloading:

* install all project dependencies with `npm install`
* start the development server with `npm start`


###  Dependencies

In order for your MyReads app to function properly, the following packages and files must be in place.
Please verify that your local directory has the following:

#### In the `src` folder

* App.js _This is the root of the app_
* ShowBooks.js, SearchBooks.js, and EachBook.js _These are the component files_
* BooksAPI.js _This is the backend of the app, which manipulates Udacity's API_


#### In the `node_modules` folder

You will also need the following packages:

* prop-types
* react-router-dom
* sort-by

If any of these folders are missing, please see the _Troubleshooting_ section of this file
Finally,


## Using MyReads



## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


## Troubleshooting The App

First, check that the `node_modules` folder contains the following packages:

* prop-types
* react-router-dom
* sort-by

If you do _not_ have those folders, you must download them. Using your terminal or git bash, enter the following commands:

Use ` ` for prop-types
Use ` ` for react-router-dom
Use ` ` for sort-by
 

If you have those folders, check these three files and add the following lines if they are absent.

#### `App.js`

Please verify you have the following lines at the top of the file:

```
import { Route } from 'react-router-dom'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
```


#### `ShowBooks.js`

Please verify you have the following lines at the top of the file:

```
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'
```


#### `SearchBooks.js`

Please verify you have the following lines at the top of the file:

```
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'
import * as BooksAPI from './BooksAPI'
```
