import React, {Component} from "react";

import '../App.css'

export default class MueslisPage extends Component {
    state = {
        muesliData: {
          result: []
        }
    }

    render() {
        return (
            <div>
                <main id="content-area">
                    {/*Default content is Products table*/}
                    <h1>My mueslis</h1>
                    <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>id</th>
                              <th>name</th>
                              <th>price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/*<tr><td>1</td><td>Classic Muesli</td><td>$4.65</td></tr>*/}
                            {/*JSON.stringify(this.state.muesliData)*/}
                            { this.state.muesliData.result.map(muesli => 
                              <tr key={muesli.id}>
                                <td>{muesli.id}</td>{/* Ha nem stringként akarjuk akkor: +muesli.id */}
                                <td>{muesli.name}</td>
                                <td>{muesli.price} Ft</td>
                              </tr>)}
                          </tbody>
                        </table>
                    </div>
                </main>
            </div>
        )
    }

    async componentDidMount() {
        try {
          let muesliData = await fetch('http://localhost:3333/mueslis')
          console.log('muesliData ', muesliData)
          muesliData = await muesliData.json()
          console.log('muesliData ', muesliData)

          this.setState({muesliData})
        } catch (e) {
          console.warn(e)
        }
    }
}