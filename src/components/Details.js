import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

const Details = (props) => {
  const params = useParams();
  const [amount, setAmount] = useState();
  const [organization, setOrganization] = useState({});

  const getOrganizationById = useCallback(async () => {
    const id = parseInt(params.index);
    console.log(id);
    const _organization = props.organizations.filter((org) => org.index === id);
    setOrganization(_organization[0]);
    console.log(_organization);
  }, [params.index, props.organizations]);

  const donateHandler = (index) => (event) => {
    event.preventDefault();
    props.donateToOrganization(index, amount);
    setAmount("");
  };

  useEffect(() => {
    getOrganizationById();
  }, [getOrganizationById]);

  return (
    <main>
      {/* page-title-area start */}
      <section
        className="page-title-area"
        data-background="assets/img/bg/breadcumb.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-title page-title-white text-center">
                <h2>Fund Details</h2>
                <div className="breadcrumb-list">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Pages</a>
                    </li>
                    <li>Fund Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page-title-area end */}
      {/* event-area start */}
      <section className="event-area pos-relative pt-90 pb-120">
        <div className="container">
          <div className="row">
            <div className=" col-lg-3 col-md-3">
              <div className="fund-info mb-30">
                <span style={{ fontSize: "10px" }}>
                  {organization.organizationAddress}
                </span>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 ">
              <div className="event-day-time pl-15">
                <div className="section-title mb-30">
                  <p>
                    <span /> {organization.description}
                  </p>
                  <h1>{organization.name}</h1>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="fund-text mb-50">
                <p>{organization.category}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div className="fund-form mb-30">
                <form onSubmit={donateHandler(organization.index)}>
                  <input
                    type="text"
                    placeholder="Enter your amount "
                    required
                    value = {amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="btn" type="submit">
                    Donate <img src="assets/img/icon/arrow.png" alt="" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Details;
