import { Order } from '../components/Order';
import common from '../styles/common.module.scss';

export interface IAgreementPageProps {

}

export function AgreementPage({}: IAgreementPageProps) {

  return (
    <>
      <div className={common.title}>
        Согласование заявки
      </div>
      <Order dtTime={new Date()} sAdress='Здание 1' sCabinet='№214' sState='На согласовании'/>
      <Order dtTime={new Date()} sAdress='Здание 2' sCabinet='№112' sState='На согласовании'/>
      <Order dtTime={new Date()} sAdress='Здание 3' sCabinet='№315' sState='На согласовании'/>
    </>
  )
}