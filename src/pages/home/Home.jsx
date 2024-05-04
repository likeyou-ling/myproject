import BarChr from './components/BarChr';

export default function Home() {
  return (
    <>
      <BarChr title="font-end three frame satisfaction" subtext="前端三大框架满意度调研" seriesData={[150, 200, 50]} xAxisData={['Vue', 'React', 'Angular']} left="15rem"></BarChr>
      <BarChr title="Proportion of meals per day" subtext="每日三餐占比" seriesData={[50, 30, 20]} xAxisData={['breakfast', 'lunch', 'dinner']} left="55rem"></BarChr>
    </>
  )
}
