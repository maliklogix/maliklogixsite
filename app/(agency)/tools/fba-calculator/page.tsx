'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function FbaCalculatorPage() {
  const [sellingPrice, setSellingPrice] = useState<number>(29.99);
  const [wholesaleCost, setWholesaleCost] = useState<number>(15);
  const [inboundShipping, setInboundShipping] = useState<number>(1.5);
  const [fulfillmentFee, setFulfillmentFee] = useState<number>(3.8);
  const [otherFees, setOtherFees] = useState<number>(0.75);
  const [referralPercent, setReferralPercent] = useState<number>(15);
  const [quantity, setQuantity] = useState<number>(1);

  const qty = Math.max(0, quantity);
  const results = useMemo(() => {
    const revenue = sellingPrice * qty;
    const referralFeeTotal = sellingPrice * (referralPercent / 100) * qty;
    const totalFees = referralFeeTotal + fulfillmentFee * qty + otherFees * qty;
    const totalCost = wholesaleCost * qty + inboundShipping * qty + totalFees;
    const profit = revenue - totalCost;

    const investment = wholesaleCost * qty + inboundShipping * qty + otherFees * qty;
    const roi = investment > 0 ? (profit / investment) * 100 : 0;

    const profitPerUnit = qty > 0 ? profit / qty : 0;
    const revenuePerUnit = sellingPrice;

    const margin = revenuePerUnit > 0 ? (profitPerUnit / revenuePerUnit) * 100 : 0;

    return {
      revenue,
      totalCost,
      profit,
      roi,
      profitPerUnit,
      margin,
    };
  }, [sellingPrice, wholesaleCost, inboundShipping, fulfillmentFee, otherFees, referralPercent, qty]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">Amazon Wholesale FBA Calculator</h1>
      <p className="mt-4 text-[#6E6E82] max-w-2xl">
        Enter your deal numbers to estimate net profit per unit and for your quantity. This is a simplified
        model (you can tweak fees to match your listings).
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6 md:p-7 space-y-6">
          <NumberField
            label="Selling price (per unit)"
            value={sellingPrice}
            onChange={setSellingPrice}
            min={0}
            step={0.01}
          />
          <NumberField
            label="Wholesale cost (per unit)"
            value={wholesaleCost}
            onChange={setWholesaleCost}
            min={0}
            step={0.01}
          />
          <NumberField
            label="Inbound shipping to Amazon (per unit)"
            value={inboundShipping}
            onChange={setInboundShipping}
            min={0}
            step={0.01}
          />

          <NumberField
            label="Fulfillment fee (per unit)"
            value={fulfillmentFee}
            onChange={setFulfillmentFee}
            min={0}
            step={0.01}
          />
          <NumberField
            label="Other fees (per unit)"
            value={otherFees}
            onChange={setOtherFees}
            min={0}
            step={0.01}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Referral fee %"
              value={referralPercent}
              onChange={setReferralPercent}
              min={0}
              step={0.1}
            />
            <NumberField
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              min={0}
              step={1}
            />
          </div>

          <p className="text-xs text-[#6E6E82] leading-relaxed">
            Fee model: referral fee is calculated as <span className="font-semibold">selling price × referral%</span>.
            Then we subtract wholesale, inbound shipping, fulfillment, and other fees.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6 md:p-7">
          <h2 className="font-heading text-xl font-extrabold text-[#0D0D12]">Estimated Results</h2>
          <div className="mt-5 space-y-4">
            <Stat label="Revenue" value={`$${results.revenue.toFixed(2)}`} />
            <Stat label="Total costs (incl. fees)" value={`$${results.totalCost.toFixed(2)}`} />
            <Stat
              label="Net profit"
              value={`$${results.profit.toFixed(2)}`}
              tone={results.profit >= 0 ? 'good' : 'bad'}
            />
            <Stat label="ROI (on wholesale + inbound)" value={`${results.roi.toFixed(1)}%`} tone={results.roi >= 0 ? 'good' : 'bad'} />
            <Stat label="Margin (per unit)" value={`${results.margin.toFixed(1)}%`} />
          </div>

          <div className="mt-6 border-t border-[#E4E4EB] pt-6">
            <p className="text-sm text-[#6E6E82]">
              Want us to validate your numbers and produce an AI-driven listing + outreach plan?
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
              >
                Book a Free AI Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  step: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6E6E82]">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
      />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  const color =
    tone === 'good' ? 'text-[#00C896]' : tone === 'bad' ? 'text-[#FF6B35]' : 'text-[#0D0D12]';
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm text-[#6E6E82]">{label}</div>
      <div className={`text-lg font-extrabold ${color}`}>{value}</div>
    </div>
  );
}

