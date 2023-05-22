import 'croppie/croppie.css'

import { Dropzone, FileItem } from '@dropzone-ui/react'
import { Dialog, Paper, styled } from '@mui/material'
import Croppie, { CroppieOptions } from 'croppie'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { Button, CloseButton } from 'src/components'

export interface IBannerImageEditModalProps {
  open: boolean
  image: string
  handleSaveBannerImage: (bannerImage: any) => void
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

export const BannerImageEditModal: FC<IBannerImageEditModalProps> = memo(
  ({
    open,
    image,
    handleSaveBannerImage,
    onClose
  }: IBannerImageEditModalProps) => {
    // const CHARACTER_LIMIT = 2600

    // const [bannerImage, setBannerImage] = useState('')

    // start kps
    const [croppie, setCrppie] = useState<any>(null)
    // const [cDiv, setcDiv] = useState<any>(null)
    // const [cHTML, setcHTML] = useState('')
    const [files, setFiles] = useState([])
    const [showDrop, setShowDrop] = useState(true)

    const bannerImageCroppie = useRef<HTMLDivElement>(null)

    const croppieOptions: CroppieOptions = {
      showZoomer: true,
      enableOrientation: true,
      mouseWheelZoom: 'ctrl',
      enforceBoundary: false,
      viewport: {
        width: 700,
        height: 280,
        type: 'square'
      },
      boundary: {
        width: 900,
        height: 300
      }
    }

    // // end kps

    // useEffect(() => {
    //   setBannerImage(image)
    // }, [image])

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
      handleSaveBannerImage(blob)

      setShowDrop(true)
      setFiles([])
      // setBannerImage('')
      onClose()
    }

    const updateFiles = (incommingFiles: any) => {
      setFiles(incommingFiles)

      const croppieDiv: any = bannerImageCroppie.current

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
            Add bannerImage
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton
              onClose={() => {
                setShowDrop(true)
                setFiles([])
                // setBannerImage('')
                onClose()
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 p-8 items-end">
          <div id="banner-image-croppie" ref={bannerImageCroppie}></div>
          {showDrop && (
            <div className="formControl w-full">
              <Dropzone onChange={updateFiles} value={files}>
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
          <Button
            buttonLabel="Save"
            variant="contained"
            className="w-[100px]"
            onClick={handleSaveButtonClick}
          />
        </div>
      </Dialog>
    )
  }
)

BannerImageEditModal.displayName = 'BannerImageEditModal'

export default BannerImageEditModal
