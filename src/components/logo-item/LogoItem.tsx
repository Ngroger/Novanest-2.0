import { useNavigate } from "react-router-dom";
import { ProductType } from "../../state/product-reducer";
import "./logo-item.css";

type LogoItemPropsType = {
  logoItem: ProductType;
};

// Функция для вычисления старой цены
const calculateOldPrice = (newPrice: number, salePercent: number): number => {
  if (salePercent <= 0) return newPrice;
  return Math.round(newPrice / (1 - salePercent / 100));
};

const LogoItem = (props: LogoItemPropsType) => {
  const navigate = useNavigate();
  const { logoItem } = props;

  const handleBuyClick = () => {
    navigate(`/product-card/${logoItem.product_id}`);
  };

  // Извлекаем данные
  const { sale_percent, price } = logoItem;
  const newPrice = parseFloat(price);

  // Вычисляем процент скидки и старую цену
  const salePercentNumber = sale_percent || 0;
  const oldPrice = salePercentNumber ? calculateOldPrice(newPrice, salePercentNumber) : null;

  return (
    <div className="logo-item">
      <img
        src={`https://novanest.webshop2.kz/api/products/previewImage/${logoItem.photo_preview_one}`}
        alt={logoItem.title}
      />
      {sale_percent && (
        <div className="logo-item-sale">-{salePercentNumber}%</div>
      )}
      <div className="logo-item-info">
        <p className="logo-item-name">{logoItem.title}</p>
        <p className="logo-item-category">{logoItem.category}</p>
        <div className="logo-item-price-container">
          <p className="logo-item-new-price">{newPrice}₸</p>
          {oldPrice !== null && (
            <p className="logo-item-old-price">{oldPrice}₸</p> // Отображаем старую цену
          )}
        </div>
      </div>
      <button onClick={handleBuyClick}>Купить</button>
    </div>
  );
};

export default LogoItem;
