import React from "react";

export default function SortSelect({ sortDescription, handleSort }) {
  return (
    <div className="container">
      <div className="row g-4">

        <div class="col-md-3">
          <div class="form-floating">
            <select class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={handleSort}>
              {/* <option selected>{sortDescription}</option> */}
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <label className='fuerte' for="floatingSelect">{sortDescription}</label>
          </div>
        </div>

      </div>
    </div>
  );
}