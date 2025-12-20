import { Estimate } from '../types';

interface EstimatePageProps {
  data: Estimate;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function EstimatePage({ data }: EstimatePageProps) {
  const { title, description, lineItems, subtotal, tax, total, notes } = data;

  return (
    <div className="page estimate-page">
      <h2 className="section-title">{title}</h2>
      <div className="accent-bar"></div>
      {description && <p className="estimate-description">{description}</p>}

      <table className="estimate-table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="numeric">Total</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr key={index}>
              <td className="description-cell">
                <div>{item.description}</div>
                {item.notes && (
                  <div className="line-notes">{item.notes}</div>
                )}
              </td>
              <td className="numeric">{formatCurrency(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="estimate-totals">
        <div className="estimate-totals-row subtotal">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {tax !== undefined && (
          <div className="estimate-totals-row">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        )}
        <div className="estimate-totals-row total">
          <span>Total Investment</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {notes && (
        <div className="estimate-notes">
          {notes}
        </div>
      )}
    </div>
  );
}
