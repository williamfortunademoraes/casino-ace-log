import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MonthlyData } from '@/types';

interface MonthlyProfitChartProps {
  data: MonthlyData[];
}

const MonthlyProfitChart = ({ data }: MonthlyProfitChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="card-glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Lucro por Mês</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis 
              dataKey="mes" 
              stroke="hsl(220, 10%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(220, 10%, 55%)"
              fontSize={12}
              tickFormatter={(value) => `R$${value}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 15%, 10%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
              labelStyle={{ color: 'hsl(0, 0%, 98%)' }}
              formatter={(value: number) => [formatCurrency(value), 'Lucro']}
            />
            <Bar dataKey="lucro" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.lucro >= 0 ? 'hsl(156, 72%, 43%)' : 'hsl(0, 72%, 64%)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyProfitChart;
