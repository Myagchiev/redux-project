import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import '../../scss/forComponents/PaymentDeliveryPage.scss';

const PaymentDeliveryPage = () => {
  return (
    <section className="payment-delivery-page">
      <Breadcrumbs />
      <div className="container">
        <h2>Оплата и доставка</h2>
        <div className="content">
          <h3>Доставка и самовывоз</h3>
          <p>Интернет-заказы формируются менеджером в течение 1-2 дней.</p>
          <p>
            <strong>Самовывоз:</strong> после подтверждения менеджером и оплаты
            заказа. Заказ можно забрать в любой день с 12 до 20, по адресу:
            Стромынский переулок, дом 6.
          </p>
          <h4>Доставка кормов и малогабаритных товаров:</h4>
          <ul>
            <li>В пределах МКАД: от 300 рублей.</li>
            <li>За МКАД до 5 км: от 500 рублей</li>
            <li>За МКАД до 10 км: от 800 рублей</li>
            <li>За МКАД более 10 км: от 900 рублей</li>
          </ul>
          <p>Цену доставки устанавливает курьерская служба Dostavista.</p>
          <p>
            Поправки к заказу после подтверждения заказа менеджером принимаются
            только по телефону +7 (926) 953-73-35 не позднее чем за 3 часа до
            ожидаемого времени прибытия заказа.
          </p>
          <p>
            Живые/замороженные корма и хрупкие товары доставляются только по
            Москве.
          </p>
          <p>
            Доставка крупногабаритных или тяжелых товаров (общей массой более 5
            кг) по городу и области осуществляется силами транспортных компаний.
          </p>
          <p>
            Доставка в регионы осуществляется транспортными компаниями ПЭК и
            Боксберри. Стоимость услуги оплачивается клиентом.
          </p>
          <h3>Оплата</h3>
          <p>Оплатить заказ вы можете одним из следующих способов:</p>
          <ul>
            <li>
              Наличными при получении (при заказе до 5000₽ по Москве и
              Московской области)
            </li>
            <li>Оплата онлайн</li>
          </ul>
          <h4>Оплата онлайн (через систему ROBOKASSA)</h4>
          <p>
            Наш интернет-магазин работает на основе системы электронных платежей
            ROBOKASSA, объединяющей в себе различные формы оплаты без комиссии:
          </p>
          <ul>
            <li>Банки</li>
            <li>Пластиковые карты</li>
            <li>Оплата через iPhone</li>
            <li>Выставление счета в интернет-банк</li>
            <li>Оплата в розничных сетях</li>
            <li>Электронные деньги</li>
            <li>Терминалы моментальной оплаты</li>
          </ul>
          <p>
            При оформлении заказа через меню корзины выберите из списка
            вариантов подходящий способ доставки и форму оплаты «Оплата через
            Робокассу», после чего нажмите на кнопку «Отправить».
          </p>
          <p>
            В появившемся на экране уведомлении при нажатии на кнопку «Оплатить»
            произойдет автоматический переход на страницу с вариантами оплаты,
            где вам потребуется выбрать нужный вам способ и, указав требуемые в
            инструкции данные, совершить оплату.
          </p>
          <p>
            После этого заказ будет считаться подтвержденным и поступит в
            обработку.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentDeliveryPage;
