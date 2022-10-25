import React, { useState, useEffect } from "react";
import styles from "./Brands.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ContentLayout from "../ContentLayout/ContentLayout";
import Transition from "../TransitionContainers/Transition/Transition";
import CreateBrandModal from "./components/CreateBrandModal/CreateBrandModal";
import { useSelector, useDispatch } from "react-redux";
import { getBrands } from "../../store/apis/brand";
import { setBrands } from "../../store/slices/brands";
import Item from "./components/Item/Item";

const Brands = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const {
    brandData: { brands },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getBrands()
      .then((res) => {
        if (!res.errors) {
          dispatch(setBrands(res.data.brands));
        } else alert(res.errors[0].message);
      })
      .catch((err) => alert(err));
  }, []);

  const createHandler = () => {
    setIsModalShow(true);
  };
  return (
    <ContentLayout title="Brands" createHandler={createHandler}>
      <div className={styles.body}>
        <div className={styles.listHead}>
          <span>Logo</span>
          <span>Name</span>
          <span>Edit</span>
          <span>Delete</span>
          <span className={styles.filterIcon}>
            <FontAwesomeIcon icon={faFilter} />
          </span>
        </div>
        <div className={styles.listWrapper}>
          {brands &&
            brands.map((brand) => <Item key={brand._id} brand={brand} />)}
        </div>
      </div>
      <Transition isShow={isModalShow} className="fade">
        <CreateBrandModal setIsModalShow={setIsModalShow} />
      </Transition>
    </ContentLayout>
  );
};

export default Brands;
