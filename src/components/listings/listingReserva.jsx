'use client';

import { Range } from 'react-date-range';
import Calendario from '../input/Calendario';
import Button from '../Button';


export default function ListingReserva({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates = []
}) {
  return (
    <main className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <section className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price} por noche
        </div>
      </section>

      {/* ✅ Pasamos dateRange directamente */}
      <Calendario
        value={dateRange}
        disabledDates={disabledDates}
        onChange={onChangeDate} // ✅ Recibe Range directamente
      />

      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Reservar"
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div><p>Total</p></div>
        <div>$ {totalPrice}</div>
      </div>
    </main>
  );
}