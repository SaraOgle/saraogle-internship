import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [nftId]);

  if (loading) return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              
              <div className="col-md-6 text-center">
                <div
                  className="skeleton"
                  style={{ width: "100%", height: "400px", borderRadius: "8px" }}
                ></div>
              </div>

      
              <div className="col-md-6">
                <div className="item_info">
                 
                  <div className="skeleton" style={{ width: "70%", height: "30px", marginBottom: "15px" }}></div>
                  
                  <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                    <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                    <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                  </div>
                  
                  <div className="skeleton" style={{ width: "100%", height: "15px", marginBottom: "8px" }}></div>
                  <div className="skeleton" style={{ width: "90%", height: "15px", marginBottom: "8px" }}></div>
                  <div className="skeleton" style={{ width: "80%", height: "15px", marginBottom: "20px" }}></div>

                  
                  <div className="skeleton" style={{ width: "60px", height: "18px", marginBottom: "10px" }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                    <div className="skeleton" style={{ width: "120px", height: "18px" }}></div>
                  </div>

                  
                  <div className="skeleton" style={{ width: "60px", height: "18px", marginBottom: "10px" }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                    <div className="skeleton" style={{ width: "120px", height: "18px" }}></div>
                  </div>

                  
                  <div className="skeleton" style={{ width: "50px", height: "18px", marginBottom: "10px" }}></div>
                  <div className="skeleton" style={{ width: "100px", height: "30px" }}></div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );

  if (!item) return <h2>Item not found</h2>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;