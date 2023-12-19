import GaugeChart from 'react-gauge-chart'

export function MyGauge ({temperature})  {
    return (
        <>
        <GaugeChart id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.13, 0.25, 0.25, 0.37]}
                colors={['#00719c','#5BE12C', '#F5CD19', '#EA4228']}
                percent={(temperature + 30.0) / 230.0}
                arcPadding={0.02}
                textColor={'#333333'}
                needleColor={'#aaaaaa'}
                needleBaseColor={'#aaaaaa'}
                animate={false}
                formatTextValue={value => temperature+"°C"}
            />
        </>
    )
}
