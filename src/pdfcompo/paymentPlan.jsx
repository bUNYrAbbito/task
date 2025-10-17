import React from 'react';
import './PaymentPlan.css';

export default function PaymentPlan(props) {
  const totalAmount = props.totalAmount;
  const tcsNote = props.tcsNote;
  const installments = Array.isArray(props.installments) ? props.installments : [];
  const hasInstallments = installments.length > 0;
  const hasSummary = !!totalAmount || !!tcsNote;
  if (!hasInstallments && !hasSummary) return null;
  return (
    <div className="plan-container">
      <h2 className="plan-title"><spam class="text-black">Payment </spam>Plan</h2>
      {hasSummary ? (
        <>
          <div className="summary-row total-amount-row">
            <div className="summary-label total-label">Total Amount</div>
            <div className="summary-value total-value">{totalAmount}</div>
          </div>
          <div className="summary-row tcs-row">
            <div className="summary-label tcs-label">TCS</div>
            <div className="summary-value tcs-value">{tcsNote || 'Not Collected'}</div>
          </div>
        </>
      ) : null}
      {hasInstallments ? (
        <div className="installment-table-wrapper">
          <div className="installment-header-row">
            <div className="header-cell installment-header">Installment</div>
            <div className="header-cell amount-header">Amount</div>
            <div className="header-cell due-date-header">Due Date</div>
          </div>
          <div className="installment-body">
            {installments.map(function (it, i) {
              return (
                <div key={i} className="installment-data-row">
                  <div className={`data-cell installment-cell ${i === installments.length - 1 ? 'last-row-left' : ''}`}>{it.installment}</div>
                  <div className={`data-cell amount-cell ${it.amountClass || ''}`}>{it.amount}</div>
                  <div className={`data-cell due-date-cell ${i === installments.length - 1 ? 'last-row-right' : ''}`}>{it.dueDate}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}