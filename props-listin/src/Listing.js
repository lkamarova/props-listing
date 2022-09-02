import PropTypes from 'prop-types';

const Listing = ({ item }) => {
  const conversionCurrency = (currency, price) => {
    switch (currency) {
      case "USD":
        return `$${price}`;
      case "EUR":
        return `€${price}`;
      default:
        return `${price}${currency}`;
    }
  };

  const getColorQuantity = (quantity) => {
      if(quantity <= 10) {
          return "level-low";
      } else if (quantity <= 20 && quantity > 10) {
          return "level-medium";
      } else {
        return "level-high"
      }
  };

  return (
    <div className="item-list">
      {item?.filter(el => !el.error_messages).map((el) => 
        (<div className="item" key={el.listing_id}>
          <div className="item-image">
            <a href={el.url}>
              <img src={el.MainImage?.url_570xN} alt={""} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{`${el.title?.substring(0, 50)}...`}</p>
            <p className="item-price">{conversionCurrency(el.currency_code, el.price)}</p>
            <p className={`item-quantity ${getColorQuantity(el.quantity)}`}>{`${el.quantity} left`}</p>
          </div>
        </div>)
      )}
    </div>
  );
};

Listing.propTypes = {
    item: PropTypes.arrayOf(PropTypes.shape({
        listing_id: PropTypes.number.isRequired, 
        url: PropTypes.string.isRequired,
        MainImage: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        currency_code: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    }))
}

export default Listing;
