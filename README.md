# Installation

## Node document converter server

### Requirements

- node
- unoconv (https://github.com/unoconv/unoconv)
- OpenOffice


## Usage

Run `yarn start` or `npm start` and head to `localhost:3000`.

By default control bar is hidden, a default PDF document is displayed and autorotate is toggled on. Meaning it will go to the next page automatically every 3 second.

- The webpack server with the viewer is running on `localhost:3000`

- The express REST Api to convert documents and to control the viewer from API calls is running on `localhost:3001`

- The websocket server to send message to the viewer is running on `localhost:3002`

### Features

- Display PPT, PDF documents and images consistently
- Full keyboard control or light UI
- Full API Control
- Autorotate, loop (goes back to 1st page after the last page)
- Meant to be used for a video/tv setup
- Full screen display

### Keyboard and on screen controls

Press `C` to display control bar
`Arrows` to go next, last, previous and first page
`R` to toggle autorotate

You can control autorotate speed with the control bar (no keyboard yet)

Click the upload icon to change the document displayed (ppt, pdf or image)

### API Control

The viewer is controlable through an API. When the page is open, the viewer connects to a websocket endpoint and gets attributed a uuid.

The uuid is displayed in the control bar of the viewer and is used in the API to target that particular client

If no uuid is provided in the API, every client are targeted

**POST**

- `/api/nextPage/:uuid` 
Goes to the next page
<br>

- `/api/previousPage/:uuid`
Goes to the previous page
<br>

- `/api/lastPage/:uuid`
Goes to the last page
<br>

- `/api/firstPage/:uuid`
Goes to the first page
<br>

- `/api/toggleAutorotateOn/:uuid`
Set the autorotate function on
<br>

- `/api/toggleAutorotateOff/:uuid`
Set the autortate function off
<br>

- `/api/toggleAutorotate/:uuid`
Toggle the autorotate function
<br>

- `/api/increaseAutorotateDelay/:uuid`
Increase the autorotate delay by 1sec
<br>

- `/api/decreaseAutorotateDelay/:uuid`
Decrease the autorotate delay by 2sec
<br>
