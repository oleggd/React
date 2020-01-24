import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import SwapiService from './../../services/swapi-service';
import Row from './../row/index';
import ErrorBoundry from './../error-boundry/error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  
  state = {
    selectedPerson: 3
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected} 
        getData={this.swapiService.getAllPeople}>
         {(item)=> (`${item.name} (${item.gender}, ${item.birthYear})`)
         }
      </ItemList>
    );

    const itemDetails = (
      <itemDetails personId={this.state.selectedPerson} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={ItemDetails} />
      </ErrorBoundry>
    );
  }
}
