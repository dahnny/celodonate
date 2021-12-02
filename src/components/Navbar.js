import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header id="sticky-header" className="header header-transparent mt-60">
      <div className="container">
        <div className="header-box white-bg pl-50 pr-50">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-3 col-5 d-flex align-items-center">
              <div className="header__logo">
                <Link to="/">
                  <img src="assets/img/logo/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-7 col-md-9">
              <div className="header__right f-right">
                <div className="header__icon f-right mt-30 ml-30 d-none d-md-block">
                  <a className="btn" href="#">
                    Balance:{props.balance}cUSD
                  </a>
                </div>
              </div>
              <div className="header__menu f-right">
                <nav id="mobile-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>

                    </li>

                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-12">
              <div className="mobile-menu" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
