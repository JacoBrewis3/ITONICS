--- instructions --

run: npm i
run: npm run start

--- notes --
This small application was written with state management usinng NGXS, angular material design for main ui components such as sidenav, and mainly just custom SCSS. D3.js for the visual presentation of the world or rather Europe.

A brief overview of how things work:

on the app.component -  this.store.dispatch(new WorldActions.Fetch()); - the store is dispatched to retrieve the service to get the json object.

 const europeData: Region = action.payload["Europe"];

            const europeDataMapped = convertToHierarchy(europeData);

            if (!europeDataMapped) {
                return;
            }

            ctx.patchState({
                region: europeData ?? null,
                hierachy: europeDataMapped,
                isLoading: false
            })
The data is transformed before patching the state to work with d3.js

There are 3 main states in the world.state:

1. error
2. completed 
3. preloading 

To invoke an error rename the file in the 