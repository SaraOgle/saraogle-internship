import React, { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Items from "../UI/Items";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
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
      560:  { items: 2 },
      760:  { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {loading ? (
              <div className="row">
                {Array(4).fill(null).map((_, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div
                          className="skeleton"
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      </div>
                      <div className="nft__item_wrap">
                        <div
                          className="skeleton"
                          style={{ width: "100%", height: "250px" }}
                        />
                      </div>
                      <div className="nft__item_info">
                        <div
                          className="skeleton"
                          style={{ width: "100px", height: "20px", marginBottom: "8px" }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: "60px", height: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {items.map((item) => (
                <div key={item.id} data-aos="fade">
                <Items item={item} />
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

export default NewItems;