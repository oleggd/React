import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import './item-details.css';

export default class ItemDetails extends Component {
  state = {
    person: null,
    loading: true
  };

  swapiService = new SwapiService();
  
  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const {personId} = this.props;
    if (!personId) {
      return;
    }
    this.setState({loading: true});
    this.swapiService.getPerson(personId)
      .then((person)=> {
        this.setState({person, loading: false});
      });
  }

  render() {
    const { person, loading } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PersonView person={person} /> : null;

    if (!person) {
      return (<span>Select a person from list</span>);
    }

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    )
  }
}


const PersonView = ({person}) => {
  const { id, name, gender, birthYear, eyeColor } = person;

    return (
      <React.Fragment>
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </React.Fragment>
    )
}