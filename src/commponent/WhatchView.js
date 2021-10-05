import React, { Component } from 'react';
import{Card,Button} from 'react-bootstrap';

export class WhatchView extends Component {
    render() {
        return (
            <div>
                {this.props.watchdataApi.map(watch=>{
                    return  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={watch.image_url} />
                    <Card.Body>
                      <Card.Title>{watch.tilte}</Card.Title>
                      <Card.Text>
                          {watch.description} /
                            {watch.toUSD}
                      </Card.Text>
                      <Button variant="primary" onClick={(e)=>this.props.handelAdd(watch)}>Add toFav</Button>
                    </Card.Body>
                  </Card>
                })

                }
              

                
            </div>
        )
    }
}

export default WhatchView
