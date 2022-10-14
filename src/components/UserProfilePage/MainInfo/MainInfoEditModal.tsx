import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo, useState } from 'react'
import { Button, CloseButton, TextField } from 'src/components'
import { setPrimaryProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'
import { IProfile } from 'src/types'

export interface IMainInfoEditModalProps {
  open: boolean
  onClose: () => void
  primaryProfile: IProfile
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

export const MainInfoEditModal: FC<IMainInfoEditModalProps> = memo(
  ({ open, onClose, primaryProfile }: IMainInfoEditModalProps) => {
    const dispatch = useAppDispatch()
    const [fullName, setFullName] = useState(
      primaryProfile?.firstName + ' ' + primaryProfile?.lastName
    )
    const [location, setLocation] = useState(primaryProfile?.location || '')
    const [lastTripLocation, setLastTripLocation] = useState(
      primaryProfile.lastTripLocation || ''
    )
    const [nextSpotOnBucketList, setNextSpotOnBucketList] = useState(
      primaryProfile.nextSpotOnBucketList || ''
    )

    const handleSaveButtonClick = async () => {
      await dispatch(
        setPrimaryProfile({
          firstName: fullName.split(' ')[0],
          lastName: fullName.split(' ')[1],
          location,
          lastTripLocation,
          nextSpotOnBucketList
        })
      )
      onClose()
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
          <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
            Edit Info
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 p-8 items-end">
          <TextField
            value={fullName}
            label="Full Name"
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            value={location}
            label="Currently In"
            placeholder="Enter your current location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            value={lastTripLocation}
            label="Last Trip"
            placeholder="Enter your last trip location"
            onChange={(e) => setLastTripLocation(e.target.value)}
          />
          <TextField
            value={nextSpotOnBucketList}
            label="Next Spot on Bucket List"
            placeholder="Enter your next spot"
            onChange={(e) => setNextSpotOnBucketList(e.target.value)}
          />
          <Button
            buttonLabel="Save"
            variant="contained"
            className="w-[100px] mt-[100px]"
            onClick={handleSaveButtonClick}
          />
        </div>
      </Dialog>
    )
  }
)

MainInfoEditModal.displayName = 'MainInfoEditModal'

export default MainInfoEditModal
