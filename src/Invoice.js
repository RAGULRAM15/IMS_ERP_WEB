import React from "react";
import "./App.css"
function Invoice(){
    return(
        <div className="App" >
            <div >
                <input type="list" id="CustomerName" placeholder="CustomerName" required />
                <datalist list="CustomerName">
                <option value={1}>1</option>
                <option value={2}>2</option>
                
                </datalist>
            </div>
            <div>
                <input type="text" placeholder="Address" readOnly required/>
            </div>
            <div>
                <input type="date" readOnly required />
            </div>
            <div>
                <input type="text" placeholder="Quotation" readOnly/>
            </div>
            <div>
                <input type="text" placeholder="User" readOnly required/>
            </div>
            <div>
                <button>Add</button>
            </div>
            <div>
            <table id="mytable">
          <thead>
            <tr>
              <th>Row No</th>
              <th>Item Name</th>
              <th>Size </th>
              <th>Style</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>

                </td>
            </tr>
            </tbody>
            </table>
            </div>
            <div>
                <button >Save</button>
            </div>
            <button>Cancel</button>
        </div>
    )

}

export default Invoice;