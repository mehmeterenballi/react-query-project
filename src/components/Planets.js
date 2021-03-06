import React from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, greetings) => {
    const res = await fetch('http://swapi.dev/api/planets/');
    return res.json();
}

const Planets = () => {
    const { data, status } = useQuery(['planets', 'hello'], fetchPlanets, {
        staleTime: 0,
        // cacheTime: 10,
    });
    console.log(data);

    return (
        <div>
            <h2>Planets</h2>

            {status === 'loading' && (
                <div>Loading data</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <div>
                    {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                </div>
            )}
        </div>
    );
}

export default Planets;