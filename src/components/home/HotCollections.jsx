import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const options = {
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    responsive: {
      0:    { items: 1 },
      576:  { items: 2 },
      768:  { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {loading ? (
              <div className="row">
                {Array(4).fill(null).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                    <div className="nft_coll">
                      <div
                        className="skeleton"
                        style={{ height: "200px", borderRadius: "8px 8px 0 0" }}
                      />
                      <div style={{ padding: "30px 10px 10px", textAlign: "center" }}>
                        <div
                          className="skeleton"
                          style={{ height: "16px", width: "60%", margin: "0 auto 8px", borderRadius: "4px" }}
                        />
                        <div
                          className="skeleton"
                          style={{ height: "12px", width: "40%", margin: "0 auto", borderRadius: "4px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {users.map((user, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${user.nftId}`}>
                        <img src={user.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${user.authorId}`}>
                        <img className="lazy pp-coll" src={user.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{user.title}</h4>
                      </Link>
                      <span>ERC-{user.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HotCollections;