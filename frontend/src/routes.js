import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Pets from './views/Pets';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Pet from './views/Pet';
import Animals from './views/Animals';
import Animal from './views/Animal';
import Persons from './views/Persons';
import Person from './views/Person';
import EventTypes from './views/EventTypes';
import EventType from './views/EventType';
import PetEvent from './views/PetEvent';
import PetEvents from './views/PetEvents';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pets" exact component={Pets} />
                <Route path="/pets/:id" exact component={Pet} />
                <Route path="/pets/:id/eventos" exact component={PetEvents} />
                <Route path="/pets/:id/eventos/:id" exact component={PetEvent} />
                <Route path="/config/animais" exact component={Animals} />
                <Route path="/config/animais/:id" exact component={Animal} />
                <Route path="/config/pessoas" exact component={Persons} />
                <Route path="/config/pessoas/:id" exact component={Person} />
                <Route path="/config/tipos-de-evento" exact component={EventTypes} />
                <Route path="/config/tipos-de-evento/:id" exact component={EventType} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}
