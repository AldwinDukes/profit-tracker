'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {

    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {

        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // get the type first letter its either R or C and convert it to Uppercase
    // slice the first 
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;

    }

    // click() {
    //     this.clicks++;
    // }

}

class Running extends Workout {

    type = "running";

    constructor(coords, distance, duration, cadence) {

        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();

    }

    calcPace() {

        this.pace = this.duration / this.distance;

        return this.pace;

    }
}

class Cycling extends Workout {

    type = "cycling";

    constructor(coords, distance, duration, elevationGain) {

        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();

    }

    calcSpeed() {

        this.speed = this.distance / (this.duration / 60);

        return this.speed;
    }
}

///////////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {

    // Private class fields
    #map
    #mapEvent
    #mapZoomLevel = 13
    #workouts = [];
    
    constructor() {

        // get users position
        this._getPosition(); // Immidiately run the getPosition method

        // get data from local storage
        this._getLocalStorage();

        // attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this)); // Inherit the newWorkout method

        inputType.addEventListener('change', this._toggleElevationField);

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));


    }

    _getPosition() {

        if(navigator.geolocation)
        
        // passing the _loadMap method
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){

            console.log("Could not get your position");

        })

    }

    _loadMap(position) {

        const {latitude} = position.coords;

        const {longitude} = position.coords;

        console.log(`https://www.google.com/maps/place/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        console.log(this);
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // latitude, longitude , zoom ratio
        //console.log(map)

        // L means namme space that we can use to use different methods provided by leaflet
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {

        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this))

        // from workouts array loop each array using the renderWorkout method
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })
    }

    _showForm(mapE) {

        this.#mapEvent = mapE;

        form.classList.remove('hidden');

        inputDistance.focus(); // focus the cursor on the km input field once the user click a location
    }

    _hideForm() {

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        form.style.display = "none";

        form.classList.add('hidden');

        setTimeout(() => form.style.display = "grid", 1000);
    }

    _toggleElevationField() {

        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');

        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    _newWorkout(e) {

        // checking if all the input are Numbers and finite using the every() and Number.isFinite() methods.
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        // Check all positive number
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();
        
        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value; // the + operator role is to convert the string value into a number. "12" => 12
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        // If workout running, create running object
        if (type === 'running') {

            const cadence = +inputCadence.value;

            // Check if data is valid
            if (
            
            !validInputs(distance,duration,cadence) || 
            !allPositive(distance,duration,cadence)
        
            )

            return alert('Inputs have to be a positive number!');

            workout = new Running([lat, lng],distance, duration, cadence);
           

        }

        // If workout cycling, create cycling object
        if (type === 'cycling') {

            const elevation = +inputElevation.value;
            
            // Check if data is valid
            
            if (
                
                !validInputs(distance,duration,elevation) || 
                !allPositive(distance,duration)
            )

            return alert('Inputs have to be a positive number!');

            workout = new Cycling([lat, lng],distance, duration, elevation);
        }

        this.#workouts.push(workout);
        console.log(workout);

        this._renderWorkoutMarker(workout);

        this._renderWorkout(workout);

        // Hide form + Clear input fields
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage();
       
    }

    _renderWorkoutMarker(workout) {

        L.marker(workout.coords)
        
        .addTo(this.#map)

        // Message at the top of the pin location marker
        .bindPopup( 

            // message container design
            L.popup({

            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,

            })
        )

        // message
        .setPopupContent(`${workout.type === 'running' ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)

        // clicked? open pop up marker
        .openPopup()
    }

    _renderWorkout(workout) {

        let html = `

            <li class="workout workout--${workout.type}" data-id="${workout.id}">

                <h2 class="workout__title">${workout.description}</h2>

                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? "🏃‍♂️" : "🚴‍♀️"}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>

                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>

        `;

        if(workout.type === 'running') 

            html += `

                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.pace.toFixed(1)}</span>
                        <span class="workout__unit">min/km</span>
                    </div>

                    <div class="workout__details">
                        <span class="workout__icon">🦶🏼</span>
                        <span class="workout__value">${workout.cadence}</span>
                        <span class="workout__unit">spm</span>
                    </div>

                </li>
            `;
        

        if(workout.type === 'cycling') 

            html += `
            
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.speed.toFixed(1)}</span>
                        <span class="workout__unit">km/h</span>
                    </div>

                    <div class="workout__details">
                        <span class="workout__icon">⛰</span>
                        <span class="workout__value">${workout.elevationGain}</span>
                        <span class="workout__unit">m</span>
                    </div>
                
                </li>
            
            `;

            form.insertAdjacentHTML('afterend', html);

    }

    _moveToPopup(e) {

        const workoutEl = e.target.closest('.workout');

        if(!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {animate: true, pan: { duration: 1,}});

        // Using the public interface
        // workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    // displaying the data from local storage after refreshing the page
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        // pass the data to the workouts array
        this.#workouts = data;

        // from workouts array loop each array using the renderWorkout method
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }

}   

const app = new App();


