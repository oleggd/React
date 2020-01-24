import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export { 
  Record 
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    image: null
  };

  swapiService = new SwapiService();
  
  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl
       ) {
      this.updateItem();
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    this.setState({loading: true});
    getData(itemId)
      .then((item)=> {
        this.setState({item, loading: false, image: getImageUrl(item)});
      });
  }

  render() {
    const { item, loading, image } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <ItemView item={item} image={image} children={this.props.children}/> : null;

    if (!item) {
      return (<span>Select a person from list</span>);
    }

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    )
  }
}


const ItemView = ({item, image, children}) => {
  const { name } = item;
    return (
      <React.Fragment>
        <img className="item-image"
          src={image}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { React.Children.map(children, (child) => {
                return React.cloneElement(child, { item });
              })
            }            
          </ul>
          <ErrorButton />
        </div>
      </React.Fragment>
    )
}