import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ChartComponent } from './chart.component'
import { StockChartComponent } from './stock-chart.component'

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChartComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

describe('StockChartComponent', () => {
  let component: StockChartComponent
  let fixture: ComponentFixture<StockChartComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StockChartComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
