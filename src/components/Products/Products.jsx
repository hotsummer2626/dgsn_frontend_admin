import React, { useState, useEffect } from "react";
import styles from "./Products.module.scss";
import ContentLayout from "../ContentLayout/ContentLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Transition from "../TransitionContainers/Transition/Transition";
import CreateProductModal from "./components/CreateProductModal/CreateProductModal";
import { getProducts } from "../../store/apis/product";
import { setProducts } from "../../store/slices/products";
import { useSelector, useDispatch } from "react-redux";
import Item from "./components/Item/Item";

const Products = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const {
    productData: { products },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (!res.errors) {
          dispatch(setProducts(res.data.products));
        } else alert(res.errors[0].message);
      })
      .catch((err) => alert(err));
  }, []);

  const createHandler = () => {
    setIsModalShow(true);
  };
  console.log(products)
  return (
    <ContentLayout title="Products" createHandler={createHandler}>
      <div className={styles.body}>
        <div className={styles.listHead}>
          <span>Image</span>
          <span>Name</span>
          <span>Brand</span>
          <span>Price</span>
          <span>Expire Date</span>
          <span>Edit</span>
          <span>Delete</span>
          <span className={styles.filterIcon}>
            <FontAwesomeIcon icon={faFilter} />
          </span>
        </div>
        <div className={styles.listWrapper}>
          {products &&
            products.map((product) => (
              <Item key={product._id} product={product} />
            ))}
        </div>
      </div>
      <Transition isShow={isModalShow} className="fade">
        <CreateProductModal setIsModalShow={setIsModalShow} />
      </Transition>
    </ContentLayout>
  );
};

export default Products;
