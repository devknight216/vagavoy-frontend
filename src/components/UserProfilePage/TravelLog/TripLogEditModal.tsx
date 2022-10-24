/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useSelector } from 'react-redux'
import Flag from 'react-world-flags'
import {
  Button,
  Calendar,
  Checkbox,
  CloseButton,
  TextField,
  TripGalleryUploadForm
} from 'src/components'
import {
  addTripLog,
  removeTrip,
  selectTripLogEntity,
  updateTripLog
} from 'src/store/reducers/tripLogsSlice'
import { useAppDispatch } from 'src/store/store'
import { ITripImage, ITripRecommendation } from 'src/types'

import TripRecommendationForm from '../../UserProfilePage/TripRecommendationForm/TripRecommendationForm'

export interface ITripLogEditModalProps {
  tripLogId?: number
  tripCountryCode?: string
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
  ({
    open,
    mode,
    tripLogId,
    tripCountryCode,
    onClose
  }: ITripLogEditModalProps) => {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const dispatch = useAppDispatch()
    const tripLog = useSelector(selectTripLogEntity(tripLogId || -1))
    const [tripStartDate, setTripStartDate] = useState<Date>(
      tripLog?.tripStartDate || new Date()
    )
    const [tripEndDate, setTripEndDate] = useState<Date>(
      tripLog?.tripEndDate || new Date()
    )
    const [tripLocation, setTripLocation] = useState(
      tripLog?.tripLocation || ''
    )
    const [tripDescription, setTripDescription] = useState(
      tripLog?.tripDescription || ''
    )
    const [tripGallery, setTripGallery] = useState<ITripImage[]>(
      tripLog?.tripGallery || []
    )
    const [tripRecommendations, setTripRecommendations] = useState<
      ITripRecommendation[]
    >(tripLog?.tripRecommendations || [{ title: '', description: '' }])

    const [selectedCountry, setSelectedCountry] = useState(
      tripLog?.tripCountryCode || tripCountryCode
    )

    useEffect(() => {
      if (tripLog) {
        setTripStartDate(tripLog.tripStartDate)
        setTripEndDate(tripLog.tripEndDate)
        setTripLocation(tripLog.tripLocation)
        setTripDescription(tripLog.tripDescription)
        setTripGallery(tripLog.tripGallery || [])
        setTripRecommendations(tripLog.tripRecommendations || [])
      }
    }, [tripLog])

    const handleSaveButtonClick = async () => {
      if (mode === 'add') {
        dispatch(
          addTripLog({
            tripCountryCode: selectedCountry || '',
            tripLocation,
            tripStartDate,
            tripEndDate,
            tripDescription,
            tripGallery,
            tripRecommendations
          })
        )
      } else if (mode === 'edit') {
        dispatch(
          updateTripLog({
            tripLogId: tripLogId || -1,
            tripCountryCode: selectedCountry || '',
            tripLocation,
            tripStartDate,
            tripEndDate,
            tripDescription,
            tripGallery,
            tripRecommendations
          })
        )
      }
      onClose()
    }

    const handleDeleteButtonClick = async () => {
      dispatch(removeTrip(tripLogId || -1))
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
