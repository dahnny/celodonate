import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BigNumber from "bignumber.js";

const Home = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  const formHandler = (event) => {
    event.preventDefault();
    props.addOrganization(name, category, description, address);
    setName("");
    setDescription("");
    setCategory("");
    setAddress("");
  };
  return (
    <main>
      <section className="shop-banner-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    {props.organizations.map((organization) => (
                      <div className="col-lg-4 col-md-6">
                        <div className="product mb-40">
                          <div className="product__img">
                            <Link to={`details/${organization.index}`}>
                              <img
                                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="product__content text-center pt-35">
                            <span className="pro-cat">
                              <Link to={`details/${organization.index}`}>{organization.description}</Link>
                            </span>
                            <h4 className="pro-title">
                              <Link to={`details/${organization.index}`}>
                                {organization.name}
                              </Link>
                            </h4>
                            <div className="price">
                              <span>
                                Total Amount Donated:$
                                {new BigNumber(organization.totalAmount)
                                  .shiftedBy(-18)
                                  .toString()}
                              </span>

                              <span>
                                Total Contributed:
                                {organization.totalPersons} Person(s)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.isAdmin && (
        <div className="login-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Add Organization</h3>
                  <form onSubmit={formHandler}>
                    <label htmlFor="name">
                      Name <span>**</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label htmlFor="name">
                      Category <span>**</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Category"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                    <label htmlFor="name">
                      Description <span>**</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      required
                    />
                    <label htmlFor="name">
                      Address <span>**</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <button className="btn btn-black w-100">Add</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
