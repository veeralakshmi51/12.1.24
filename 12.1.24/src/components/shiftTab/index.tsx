import React, { useState } from 'react'
import './shifttab.css'
import { useSelector } from 'react-redux'
interface ShiftTabProps {
    shiftName: string
    startTime: string
    endTime: string
    slot1Time: any
    slot2Time: any
    slot3Time: any
    slot4Time: any
    selectedIncharge: string
    selectedSWorker1: string
    selectedSWorker2: string
    selectedSWorker3: string
    selectedSWorker4: string
}

const ShiftTab = (props: ShiftTabProps) => {
    const { shiftName, endTime, startTime, slot1Time, slot2Time, slot3Time, slot4Time, selectedIncharge, selectedSWorker1, selectedSWorker2, selectedSWorker3, selectedSWorker4 } = props
    const { rnInchargeList, socialWorkerList } = useSelector((state: any) => state.PSConfig)
    const [isPartial, setIsPartial] = useState<boolean>(false)
    const [isPartial2, setIsPartial2] = useState<boolean>(false)
    const [isPartial3, setIsPartial3] = useState<boolean>(false)
    const [isPartial4, setIsPartial4] = useState<boolean>(false)

    return (
        <React.Fragment>
            <div className="p-3">
                <div className="d-flex justify-content-center align-items-center rounded p-1" style={{ backgroundColor: '#0f3995' }}>
                    <span className='text-white'>{shiftName} Configuration</span>
                </div>
                <div className='row mt-1 p-1'>
                    <div className="form-floating mb-3 col-md-3 p-1" >
                        <input type="text" value={startTime} className="form-control" id="floatingStartTime" disabled placeholder='start time' />
                        <label htmlFor="floatingStartTime">Start Time</label>
                    </div>
                    <div className="form-floating mb-3 col-md-3 p-1">
                        <input type="text" value={endTime} className="form-control" id="floatingEndTime" disabled placeholder='end time' />
                        <label htmlFor="floatingEndTime">End Time</label>
                    </div>
                    <div className="mb-3 col-md-6 form-floating p-1">
                        <select className="form-select" id="floatingSelect" value={selectedIncharge ? selectedIncharge : ""}>
                        <option value="">Select Social Worker</option>
                            {
                                rnInchargeList?.map((item: any) => {
                                    return (
                                        <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor='floatingSelect'>Shift Incharge</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 p-1" style={{ backgroundColor: '#e6f0ff' }}>
                        <div className="row p-1">
                            <div className="form-floating mb-3 col-md-4 p-1">
                                <input type="text" value={slot1Time} className="form-control" id="floatingEndTime" disabled placeholder='end time' />
                                <label htmlFor="floatingEndTime">Slot 1</label>
                            </div>
                            <div className="mb-3 col-md-7 form-floating p-1">
                                <select className="form-select" id="floatingSelect" value={selectedSWorker1 ? selectedSWorker1 : ""}>
                                <option value="">Select Social Worker</option>
                                    {
                                        socialWorkerList?.map((item: any) => {
                                            return (
                                                <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor='floatingSelect'>Social Workers</label>
                            </div>
                        </div>
                        <div className="row p-1">
                            <div className="form-check col-md-4 d-flex gap-2 justify-content-center align-items-center">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault1" onChange={() => { setIsPartial(!isPartial) }} />
                                <label className="form-check-label" htmlFor="flexCheckDefault1">
                                    Partial Room
                                </label>
                            </div>
                            {isPartial &&
                                <div className="mb-3 col-md-7 form-floating p-1">
                                    <select className="form-select" id="floatingSelect2" value={selectedSWorker1 ? selectedSWorker1 : ""}>
                                    <option value="">Select Social Worker</option>
                                        {
                                            socialWorkerList?.map((item: any) => {
                                                return (
                                                    <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='floatingSelect2'>Social Workers</label>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 p-1" style={{ backgroundColor: '#e6f0ff' }}>
                        <div className="row p-1">
                            <div className="form-floating mb-3 col-md-4 p-1">
                                <input type="text" value={slot2Time} className="form-control" id="floatingEndTime" disabled placeholder='end time' />
                                <label htmlFor="floatingEndTime">Slot 2</label>
                            </div>
                            <div className="mb-3 col-md-7 form-floating p-1">
                                <select className="form-select" id="floatingSelect3" value={selectedSWorker2 ? selectedSWorker2 : ""}>
                                <option value="">Select Social Worker</option>
                                    {
                                        socialWorkerList?.map((item: any) => {
                                            return (
                                                <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor='floatingSelect3'>Social Workers</label>
                            </div>
                        </div>
                        <div className="row p-1">
                            <div className="form-check col-md-4 d-flex gap-2 justify-content-center align-items-center">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault2" onChange={() => { setIsPartial2(!isPartial2) }} />
                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                    Partial Room
                                </label>
                            </div>
                            {isPartial2 &&
                                <div className="mb-3 col-md-7 form-floating p-1">
                                    <select className="form-select" id="floatingSelect4" value={selectedSWorker2 ? selectedSWorker2 : ""}>
                                    <option value="">Select Social Worker</option>
                                        {
                                            socialWorkerList?.map((item: any) => {
                                                return (
                                                    <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='floatingSelect4'>Social Workers</label>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 p-1" style={{ backgroundColor: '#e6f0ff' }}>
                        <div className="row p-1">
                            <div className="form-floating mb-3 col-md-4 p-1">
                                <input type="text" value={slot3Time} className="form-control" id="floatingEndTime" disabled placeholder='end time' />
                                <label htmlFor="floatingEndTime">Slot 3</label>
                            </div>
                            <div className="mb-3 col-md-7 form-floating p-1">
                                <select className="form-select" id="floatingSelect5" value={selectedSWorker3 ? selectedSWorker3 : ""}>
                                <option value="">Select Social Worker</option>
                                    {
                                        socialWorkerList?.map((item: any) => {
                                            return (
                                                <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                                
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor='floatingSelect5'>Social Workers</label>
                            </div>
                        </div>
                        <div className="row p-1">
                            <div className="form-check col-md-4 d-flex gap-2 justify-content-center align-items-center">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault3" onChange={() => { setIsPartial3(!isPartial3) }} />
                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                    Partial Room
                                </label>
                            </div>
                            {isPartial3 &&
                                <div className="mb-3 col-md-7 form-floating p-1">
                                    <select className="form-select" id="floatingSelect6" value={selectedSWorker3 ? selectedSWorker3 : ""}>
                                    <option value="">Select Social Worker</option>
                                        {
                                            socialWorkerList?.map((item: any) => {
                                                return (
                                                    <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='floatingSelect6'>Social Workers</label>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 p-1" style={{ backgroundColor: '#e6f0ff' }}>
                        <div className="row p-1">
                            <div className="form-floating mb-3 col-md-4 p-1">
                                <input type="text" value={slot4Time} className="form-control" id="floatingEndTime" disabled placeholder='end time' />
                                <label htmlFor="floatingEndTime">Slot 4</label>
                            </div>
                            <div className="mb-3 col-md-7 form-floating p-1">
                                <select className="form-select" id="floatingSelect7" value={selectedSWorker4 ? selectedSWorker4 : ""}>
                                <option value="">Select Social Worker</option>
                                    {
                                        socialWorkerList?.map((item: any) => {
                                            return (
                                                <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor='floatingSelect7'>Social Workers</label>
                            </div>
                        </div>
                        <div className="row p-1">
                            <div className="form-check col-md-4 d-flex gap-2 justify-content-center align-items-center">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault4" onChange={() => { setIsPartial4(!isPartial4) }} />
                                <label className="form-check-label" htmlFor="flexCheckDefault4">
                                    Partial Room
                                </label>
                            </div>
                            {isPartial4 &&
                                <div className="mb-3 col-md-7 form-floating p-1">
                                    <select className="form-select" id="floatingSelect8" value={selectedSWorker4 ? selectedSWorker4 : ""}>
                                    <option value="">Select Social Worker</option>
                                        {
                                            socialWorkerList?.map((item: any) => {
                                                return (
                                                    <option value={item?.id}>{item?.name[0]?.given + ' ' + item?.name[0]?.family}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='floatingSelect8'>Social Workers</label>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <button className="btn-save float-end mt-3">
                    Save
                </button>
            </div>

        </React.Fragment>
    )
}

export default ShiftTab