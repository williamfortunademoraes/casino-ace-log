import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceData } from '@/types';

interface ProfitChartProps {
  data: PerformanceData[];
  title?: string;
}

const ProfitChart = ({ data, title = 'Evolução da Banca' }: ProfitChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="card-glass p-6 animate-slide-up delay-200">
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16C47F" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#16C47F" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis 
              dataKey="data" 
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
              formatter={(value: number) => [formatCurrency(value), 'Lucro Acumulado']}
            />
            <Area
              type="monotone"
              dataKey="lucroAcumulado"
              stroke="#16C47F"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorProfit)"
              dot={{ fill: '#16C47F', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#16C47F', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
