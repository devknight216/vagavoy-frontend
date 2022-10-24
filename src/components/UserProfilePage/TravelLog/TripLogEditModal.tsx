/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Paper, styled } from '@mui/material'
import { AxiosError } from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import Flag from 'react-world-flags'
import {
  Button,
  Calendar,
  Checkbox,
  CloseButton,
  TextField,
  TripGalleryUploadForm
} from 'src/components'
import { axiosInstance } from 'src/services/jwtService'
import { addTripLog, updateTripLog } from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripImage, ITripLog, ITripRecommendation } from 'src/types'

import TripRecommendationForm from '../../UserProfilePage/TripRecommendationForm/TripRecommendationForm'

export interface ITripLogEditModalProps {
  userId: string
  tripLog?: ITripLog
  open: boolean
  mode?: 'add' | 'edit'
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

const CountrySelector = styled(ReactFlagsSelect)(({ theme }) => ({
  paddingBottom: 0,
  minWidth: 'calc(100% - 96px)',
  [theme.breakpoints.up('sm')]: {
    minWidth: 320
  },
  '& [data-testid="rfs-selected-flag"]': {
    display: 'none'
  },
  '& [data-testid="rfs-btn"]': {
    color: theme.palette.green.dark,
    fontSize: '14px !important',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: '21px'
  }
}))

export const TripLogEditModal: FC<ITripLogEditModalProps> = memo(
  ({ open, mode, userId, tripLog, onClose }: ITripLogEditModalProps) => {
    const dispatch = useAppDispatch()
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const [tripStartDate, setTripStartDate] = useState<Date>(new Date())
    const [tripEndDate, setTripEndDate] = useState<Date>(new Date())
    const [tripLocation, setTripLocation] = useState('')
    const [tripDescription, setTripDescription] = useState('')
    const [tripGallery, setTripGallery] = useState<ITripImage[]>([])
    const [tripRecommendations, setTripRecommendations] = useState<
      ITripRecommendation[]
    >([])

    const [selectedCountry, setSelectedCountry] = useState('')

    useEffect(() => {
      if (mode === 'add') {
        setTripStartDate(new Date())
        setTripEndDate(new Date())
        setTripLocation('')
        setTripDescription('')
        setTripGallery([])
        setTripRecommendations([])
        setSelectedCountry(tripLog?.tripCountryCode || '')
      } else if (mode === 'edit') {
        setTripStartDate(tripLog?.tripStartDate || new Date())
        setTripEndDate(tripLog?.tripEndDate || new Date())
        setTripLocation(tripLog?.tripLocation || '')
        setTripDescription(tripLog?.tripDescription || '')
        setTripGallery(tripLog?.tripGallery || [])
        setTripRecommendations(tripLog?.tripRecommendations || [])
        setSelectedCountry(tripLog?.tripCountryCode || '')
      }
    }, [tripLog, mode])

    useEffect(() => {
      if (mode === 'add') {
        setTripStartDate(new Date())
        setTripEndDate(new Date())
        setTripLocation('')
        setTripDescription('')
        setTripGallery([])
        setTripRecommendations([])
      }
    }, [mode])

    const handleSaveButtonClick = async () => {
      if (mode === 'add') {
        dispatch(
          addTripLog({
            userId,
            tripLog: {
              tripStartDate,
              tripEndDate,
              tripDescription,
              tripGallery,
              tripRecommendations,
              tripLocation,
              tripCountryCode: selectedCountry
            }
          })
        )
      } else if (mode === 'edit') {
        dispatch(
          updateTripLog({
            userId,
            tripLog: {
              tripLogId: tripLog?.tripLogId,
              tripStartDate,
              tripEndDate,
              tripDescription,
              tripGallery,
              tripRecommendations,
              tripLocation,
              tripCountryCode: selectedCountry
            }
          })
        )
      }
      onClose()
    }

    const handleDeleteButtonClick = async () => {
      axiosInstance
        .delete(`${process.env.REACT_APP_API_URL}/travel/${tripLog?.tripLogId}`)
        .then((res) => {})
        .catch((err: AxiosError) => {
          console.log(err.message)
        })
      onClose()
    }

    const handleChangeTripGallery = (gallery: ITripImage[]) => {
      setTripGallery(gallery)
    }

    const handleChangeTripRecommendations = (
      recommendation: ITripRecommendation[]
    ) => {
      setTripRecommendations(recommendation)
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="overflow-hidden">
          <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
            <div className="flex flex-col sm:flex-row">
              <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
                {mode === 'edit' ? 'Edit Travel Log' : 'Add New Travel'}
              </span>
              <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
                {mode === 'edit'
                  ? ` - ${
                      tripLog?.tripLocation +
                      ', ' +
                      regionNames.of(tripLog?.tripCountryCode || '')
                    }`
                  : ''}
              </span>
            </div>
            <div className="flex flex-row-reverse">
              <CloseButton onClose={onClose} />
            </div>
          </div>
          <div className="overflow-auto flex-1 h-[calc(100vh-200px)]">
            <div className="flex flex-col p-8">
              {/** Image Upload */}
              <div className="flex sm:flex-row flex-col gap-x-[148px] gap-y-3 sm:mb-6 mb-4 sm:items-center">
                <div className="ml-1 flex flex-row gap-x-8 items-center sm:justify-center min-h-[56px]">
                  {selectedCountry ? (
                    <Flag
                      code={selectedCountry}
                      style={{
                        width: 64
                      }}
                    />
                  ) : (
                    <div className="min-w-[64px] h-[44px] bg-green-100"></div>
                  )}

                  <CountrySelector
                    searchable
                    selected={selectedCountry || ''}
                    placeholder="Select Trip Country"
                    onSelect={(code) => setSelectedCountry(code)}
                  />
                </div>
              </div>

              {/** Trip Information Input */}
              <div className="flex flex-col gap-y-4 sm:mb-2 mb-4">
                <div className="flex flex-row justify-between gap-x-7">
                  <TextField
                    value={tripLocation}
                    label="Trip Location"
                    placeholder="Add Location"
                    onChange={(e) => setTripLocation(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-x-7 gap-y-4">
                  <Calendar
                    value={tripStartDate}
                    label="Travel Start Date"
                    calendarPlaceholder="Select Starting Date"
                    renderInput={() => <></>}
                    onChange={(newDate) =>
                      setTripStartDate(newDate || new Date())
                    }
                  />
                  <Calendar
                    value={tripEndDate}
                    label="Travel End Date"
                    calendarPlaceholder="Select End Date"
                    renderInput={() => <></>}
                    onChange={(newDate) =>
                      setTripEndDate(newDate || new Date())
                    }
                  />
                </div>
                <TextField
                  value={tripDescription}
                  label="Trip Description"
                  multiline={true}
                  placeholder="Trip Description"
                  rows={5}
                  onChange={(e) => setTripDescription(e.target.value)}
                  helperText={`${tripDescription.length}/2600`}
                  inputProps={{ maxLength: 2600 }}
                />
              </div>

              {/** Trip Gallery */}
              <TripGalleryUploadForm
                gallery={tripGallery}
                handleChangeTripGallery={handleChangeTripGallery}
              />

              {/** Trip Recommendations */}
              <TripRecommendationForm
                tripRecommendations={tripRecommendations}
                handleChangeTripRecommendations={
                  handleChangeTripRecommendations
                }
              />

              {/** Agreement */}
              <div className="flex flex-col mt-6">
                <span className="font-bold text-sm leading-6 text-green-700 mb-2">
                  Do you want to notify your connections about this trip now?
                  You can come back and do this at any time
                </span>
                <Checkbox checkboxLabel="Yes" />
              </div>

              {/** Save Button */}
              <div className="flex justify-between items-center mt-8">
                <span
                  className="font-bold text-lg leading-6 text-green-500 cursor-pointer"
                  onClick={handleDeleteButtonClick}>
                  Delete Trip
                </span>
                <Button
                  buttonLabel="Save"
                  variant="contained"
                  className="w-[100px]"
                  onClick={handleSaveButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
)

TripLogEditModal.displayName = 'TripLogEditModal'

export default TripLogEditModal
