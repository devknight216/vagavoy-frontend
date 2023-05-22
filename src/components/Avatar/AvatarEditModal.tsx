import 'croppie/croppie.css'

import { Dropzone, FileItem } from '@dropzone-ui/react'
import { Dialog, Paper, styled } from '@mui/material'
import Croppie, { CroppieOptions } from 'croppie'
import { FC, memo, useRef, useState } from 'react'
import { Button, CloseButton } from 'src/components'

export interface IAvatarEditModalProps {
  open: boolean
  handleSaveAvatar: (avatar: any) => void
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

export const AvatarEditModal: FC<IAvatarEditModalProps> = memo(
  ({ open, handleSaveAvatar, onClose }: IAvatarEditModalProps) => {
    // const CHARACTER_LIMIT = 2600
    // const [avatar, setAvatar] = useState('')

    const [croppie, setCrppie] = useState<any>(null)
    // const [cDiv, setcDiv] = useState<any>(null)
    // const [cHTML, setcHTML] = useState('')
    const [files, setFiles] = useState([])
    const [showDrop, setShowDrop] = useState(true)

    const avatarCroppie = useRef<HTMLDivElement>(null)

    const croppieOptions: CroppieOptions = {
      showZoomer: true,
      enableOrientation: true,
      mouseWheelZoom: 'ctrl',
      enforceBoundary: false,
      viewport: {
        width: 150,
        height: 150,
        type: 'circle'
      },
      boundary: {
        width: 200,
        height: 200
      }
    }

    // useEffect(() => {
    //   setAvatar(img)
    // }, [img])

    const handleSaveButtonClick = () => {
      croppie
        .result({
          type: 'blob',
          size: 'viewport',
          format: 'png',
          quality: 1,
          circle: false
        })
        .then((blob: any) => {
          handleCroppedImage(blob)
        })
    }

    const handleCroppedImage = (blob: any) => {
      handleSaveAvatar(blob)

      setShowDrop(true)
      setFiles([])
      // setBannerImage('')
      onClose()
    }

    const updateFiles = (incommingFiles: any) => {
      setFiles(incommingFiles)

      const croppieDiv: any = avatarCroppie.current

      if (croppieDiv) {
        const newC: any = new Croppie(croppieDiv, croppieOptions)

        setCrppie(newC)

        const fileReader = new FileReader()

        fileReader.readAsDataURL(incommingFiles[0].file)

        fileReader.addEventListener('load', function () {
          if (fileReader.result) {
            newC.bind({ url: fileReader.result as string })
          }
        })

        // show crop
        setShowDrop(false)

        croppieDiv?.classList.add('show-croppie')
      }
    }

    const removeFile = (id: any) => {
      setFiles(files.filter((x: any) => x.id !== id))
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
            Edit Avatar
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton
              onClose={() => {
                // setAvatar('')
                onClose()
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 p-8">
          <div className="flex justify-start w-full gap-x-6">
            <div className="lg:w-1/3">
              <div id="banner-image-croppie" ref={avatarCroppie}></div>
              {showDrop && (
                <div className="formControl w-full">
                  <Dropzone
                    onChange={updateFiles}
                    value={files}
                    accept=""
                    style={{
                      borderRadius: '50%',
                      width: '200px',
                      height: '200px'
                    }}>
                    {files.map((file: any) => (
                      <FileItem
                        preview
                        {...file}
                        onDelete={removeFile}
                        key={file.id}
                        info
                      />
                    ))}
                  </Dropzone>
                </div>
              )}
            </div>
            <div className="lg:w-2/3">
              <h2>Show people the best vision yourself</h2>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              buttonLabel="Cancel"
              variant="outlined"
              className="w-[100px]"
              onClick={handleSaveButtonClick}
            />
            <Button
              buttonLabel="Attach Photo"
              variant="contained"
              className="w-[100px]"
              onClick={handleSaveButtonClick}
            />
          </div>
        </div>
      </Dialog>
    )
  }
)

AvatarEditModal.displayName = 'AvatarEditModal'

export default AvatarEditModal
