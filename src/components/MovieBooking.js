import React, { useState } from 'react';

let screens = [
    {
        id: 1,
        time: "10.00am",
        seats: [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1]
    },
    {
        id: 2,
        time: "2.00pm",
        seats: [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1]
    },
    {
        id: 3,
        time: "6.00pm",
        seats: [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
    }
];

const movies = [
    {
        id: 1,
        title: "LEO",
        image: "https://upload.wikimedia.org/wikipedia/en/7/75/Leo_%282023_Indian_film%29.jpg"
    },
    {
        id: 2,
        title: "Jailer",
        image: "https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg"
    },
    {
        id: 3,
        title: "Vikram",
        image: "https://upload.wikimedia.org/wikipedia/en/9/93/Vikram_2022_poster.jpg"
    }
];

export default function MovieBooking() {
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSeatSelect = (index) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (!selectedScreen) return prevSelectedSeats;
            
            const updatedSelectedSeats = [...prevSelectedSeats];
            if (updatedSelectedSeats.includes(index)) {
            
                updatedSelectedSeats.splice(updatedSelectedSeats.indexOf(index), 1);
            } else {
                updatedSelectedSeats.push(index);
            }
            return updatedSelectedSeats;
        });
    };

    const handleBooking = () => {
        alert(`Seats ${selectedSeats.map((index) => index + 1).join(", ")} booked for ${selectedMovie.title} at ${selectedScreen.time}`);
        
        // Update the seats for the selected screen
        screens = screens.map((screen) => {
            if (screen.id === selectedScreen.id) {
                let seats = [...screen.seats];
                selectedSeats.forEach((seat) => (seats[seat] = 0));
                return {
                    ...screen,
                    seats: seats,
                };
            }
            return screen;
        });
    
        // Reset state values
        setSelectedMovie(null);
        setSelectedScreen(null);
        setSelectedSeats([]);
    };
    

    return (
        <div>
            <h1>Movie Ticket Booking App</h1>
            <h2>Choose your Movie</h2>
            <div className="movie-selection">
                {movies.map((movie) => (
                    <div className="movie" key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        <img className="movie-poster" src={movie.image} alt={movie.title} />
                        <div className="movie-title">{movie.title}</div>
                    </div>
                ))}
            </div>
            {selectedMovie && (
                <>
                    <h2>Choose Your Screen</h2>
                    <div className='screen-selection'>
                        {screens.map((screen) => (
                            <div 
                                key={screen.id}
                                className={`screen ${screen.id === selectedScreen?.id ? "selected" : ""} ${screen.seats.includes(1) ? "available" : ""}`}
                                onClick={() => setSelectedScreen(screen)}
                            >
                                <div className='screen-label'>Screen {screen.id}</div>
                                <div className='screen-time'>{screen.time}</div>
                                <div className='movie-title'>{selectedMovie.title}</div>
                                <div className='screen-seats'>
                                    {screen.seats.map((seat, index) => (
                                        <div
                                            key={index}
                                            className={`seat ${seat ? "available" : "unavailable"} ${selectedSeats.includes(index) && selectedScreen && selectedScreen.id === screen.id ? "selected" : ""}`}
                                            onClick={() => handleSeatSelect(index)}
                                        >
                                            <div className="seat-number">{index + 1}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className='booking-summary'>
                <div className='selected-screen'>
                    {selectedScreen && (
                        <>
                            <h3>Selected Screen: {selectedScreen.id}</h3>
                            <p>Time: {selectedScreen.time}</p>
                            <p>Movie: {selectedMovie.title}</p>
                        </>
                    )}
                </div>
            </div>
            <div className='selected-seat'>
                {selectedScreen && selectedSeats.length > 0 && (
                    <div>
                        <h3>Selected Seats: {selectedSeats.map(index => index + 1).join(', ')}</h3>
                        <h3>No of Tickets: {selectedSeats.length}</h3>
                    </div>
                )}
            </div>
            <button className='Payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats.length === 0}>
                Book now
            </button>
        </div>
    );
}
