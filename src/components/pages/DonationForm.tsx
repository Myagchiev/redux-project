import '../../scss/forComponents/Donation.scss';
import IPhone from '../../assets/iPhone.png';
import Button from '../Button';
import { BsSquare, BsCheckSquare } from 'react-icons/bs';
import { useState, FormEvent } from 'react';

const DonationForm: React.FC = () => {
  const [oneTime, setOneTime] = useState<boolean>(false);
  const [monthly, setMonthly] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) return;
    alert(
      `Спасибо за пожертвование ${amount} ₽ (${oneTime ? 'единовременно' : monthly ? 'ежемесячно' : 'выберите тип'})!`
    );
  };

  return (
    <section className="donation">
      <div className="container">
        <div className="donation__left">
          <h2>Пожертвуйте на благо проекта</h2>
          <form onSubmit={handleSubmit}>
            <div className="checkboxes">
              <label>
                {oneTime ? (
                  <BsCheckSquare
                    className="checkbox-icon"
                    style={{ fill: '#000' }}
                    onClick={() => setOneTime(false)}
                  />
                ) : (
                  <BsSquare
                    className="checkbox-icon"
                    onClick={() => setOneTime(true)}
                  />
                )}
                Единоразовая выплата
              </label>
              <label>
                {monthly ? (
                  <BsCheckSquare
                    className="checkbox-icon"
                    style={{ fill: '#000' }}
                    onClick={() => setMonthly(false)}
                  />
                ) : (
                  <BsSquare
                    className="checkbox-icon"
                    onClick={() => setMonthly(true)}
                  />
                )}
                Ежемесячные выплаты
              </label>
            </div>
            <div className="donation__input">
              <input
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <Button
                text="Пожертвовать"
                backgroundColor="white"
                color="black"
                padding="15px 40px"
                type="submit"
              />
            </div>
          </form>
        </div>
        <div className="donation__right">
          <img src={IPhone} alt="iPhone" className="donation__image" />
        </div>
      </div>
    </section>
  );
};

export default DonationForm;