import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { BlurhashComponent } from './blurhash.component'

describe('BlurhashComponent', () => {
  let component: BlurhashComponent
  let fixture: ComponentFixture<BlurhashComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BlurhashComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(BlurhashComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
