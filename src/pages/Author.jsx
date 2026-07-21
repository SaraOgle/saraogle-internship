import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
    setAuthor((prev) => ({
      ...prev,
      followers: following ? prev.followers - 1 : prev.followers + 1,
    }));
  };

  if (loading) return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div className="skeleton" style={{ width: "150px", height: "150px", borderRadius: "50%" }}></div>
                      <div className="profile_name">
                        <h4>
                          <div className="skeleton" style={{ width: "150px", height: "20px", marginBottom: "10px" }}></div>
                          <div className="skeleton" style={{ width: "100px", height: "15px", marginBottom: "10px" }}></div>
                          <div className="skeleton" style={{ width: "200px", height: "15px" }}></div>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="skeleton" style={{ width: "100px", height: "20px", marginBottom: "10px" }}></div>
                      <div className="skeleton" style={{ width: "100px", height: "40px", borderRadius: "20px" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="row">
                  {new Array(8).fill(0).map((_, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                        </div>
                        <div className="nft__item_wrap">
                          <div className="skeleton" style={{ width: "100%", height: "250px" }}></div>
                        </div>
                        <div className="nft__item_info">
                          <div className="skeleton" style={{ width: "100px", height: "20px", marginBottom: "8px" }}></div>
                          <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );

  if (!author) return <h2>Author not found</h2>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || author?.nfts}
                    authorImage={author?.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;