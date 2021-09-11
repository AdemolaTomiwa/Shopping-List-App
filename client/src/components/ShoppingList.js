import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

class ShoppingList extends Component {
   state = {
      items: [
         { id: uuidv4(), name: 'Eggs' },
         { id: uuidv4(), name: 'Water' },
         { id: uuidv4(), name: 'Milk' },
         { id: uuidv4(), name: 'Steaks' },
      ],
   };

   render() {
      const { items } = this.state;
      return (
         <div>
            <Container>
               <Button
                  color="dark"
                  style={{ marginBottom: '2rem' }}
                  onClick={() => {
                     const name = prompt('Enter Item');
                     if (name) {
                        this.setState((state) => ({
                           items: [...state.items, { id: uuidv4(), name }],
                        }));
                     }
                  }}
               >
                  Add Item
               </Button>
            </Container>
         </div>
      );
   }
}

export default ShoppingList;
