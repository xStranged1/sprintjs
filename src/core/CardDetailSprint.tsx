import BedTicket from "@/components/ui/bedTicket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTempStyled } from "@/components/ui/iconTempStyled";
import { Slider } from "@/components/ui/slider";
import { BaseInterval, Sprint } from "@/types/Sprint";
import { formatTime } from "@/utils/utils";
import { format } from "date-fns";
import { Bed, Map, Timer, Trophy, Watch } from "lucide-react";
import { CardInterval } from "./CardInterval";
import { Button } from "@/components/ui/button";
import { deleteSprintById } from "@/services/sprintService";
import { useGetAccessToken } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const trophyColor = {
    'gold': "#f4bf1f",
    'silver': "#c4c4c4",
    'bronze': "#cf8338"
}

export const CardDetailSprint = ({ sprint, trophy }: { sprint: Sprint, trophy?: 'gold' | 'silver' | 'bronze' }) => {

    const textDate = format(sprint.date, 'dd/MM/yyyy');
    const textTime = formatTime(sprint.time)
    const textPace = formatTime(sprint.pace)
    const getAccessToken = useGetAccessToken();
    const [, navigate] = useLocation();
    const { toast } = useToast()

    const Intervals = ({ intervals }: { intervals: BaseInterval[] }) => {

        if (intervals.length == 0) return

        return (
            <CardContent className="items-center gap-6">
                <div>
                    <h2 className="font-bold mb-2">Intervalos</h2>
                    <div className="flex flex-col gap-4">
                        {intervals.map((interval) => (
                            <CardInterval key={interval.order.toString()}
                                interval={interval} />
                        ))}
                    </div>
                </div>
            </CardContent>
        )
    }

    const handleDelete = async () => {
        const token = await getAccessToken()
        const res = await deleteSprintById(sprint.id.toString(), token)
        if (!res.success) return toast({ title: 'Hubo un error eliminando el sprint', description: res.message, variant: 'destructive' })
        navigate('/sprintjs/', { replace: true })
        return toast({ title: `Se ha eliminado el sprint ${sprint.id} con éxito`, description: res.message })
    }

    return (
        <div className="my-4">
            <Card className="min-w-[450px] w-fit relative">
                <CardHeader>
                    <div className="flex flex-row justify-between gap-2">
                        {trophy && (<Trophy color={trophyColor[trophy]} className="drop-shadow" size={32} />)}
                        <CardTitle>Distancia total: {sprint.distance}m</CardTitle>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={'destructive'}>Eliminar</Button>
                            </DialogTrigger>
                            <DialogContent className="w-[310px] sm:w-[520px] md:w-[600px] lg:w-[800px]">
                                <DialogHeader>
                                    <DialogTitle>Esta seguro que quiere eliminar este sprint?</DialogTitle>
                                    <DialogDescription>
                                        El sprint, sus posibles intervalos y records personales serán eliminados permanentemente
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" variant="destructive" onClick={handleDelete}>Eliminar</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <CardDescription>{textDate}</CardDescription>
                </CardHeader>

                <CardContent className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Timer />
                        <p>Tiempo: <strong>{textTime}</strong></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Watch />
                        <p>Ritmo: <strong>{textPace}/km</strong></p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Map />
                        <p>Circuito: </p><strong>{sprint.circuit?.name ?? '?'}</strong>
                    </div>
                </CardContent>
                <CardContent className="flex items-center gap-6">
                    {sprint.effort && (<>
                        <p className="font-bold text-sm">Esfuerzo percibido</p>
                        <Slider
                            value={[sprint.effort]}
                            className="w-full"
                            max={100}
                            step={1}
                        />
                    </>)}
                    {sprint.temperature && (<>
                        <div className="flex items-center gap-2">
                            <IconTempStyled temperature={sprint.temperature} />
                            <p className="font-bold text-sm flex">Temperatura: <strong className="ml-2">{sprint.temperature}°C</strong></p>
                        </div>
                    </>)}
                    {sprint.takeBreak && (
                        <div className="flex items-center gap-2">
                            <Bed />
                            <p className="font-semibold text-sm">Con descanso</p>
                        </div>
                    )}
                    {!sprint.takeBreak && (<>
                        <div className="flex items-center gap-2">
                            <BedTicket />
                            <p className="font-semibold text-sm">Sin descanso</p>
                        </div>
                    </>)}
                </CardContent>

                {sprint.intervals && (
                    <Intervals intervals={sprint.intervals} />
                )}

                {sprint.comment && (
                    <CardContent className="items-center gap-6">
                        <h2 className="font-bold text-sm">Comentario</h2>
                        <p>{sprint.comment}</p>
                    </CardContent>
                )}

            </Card>
        </div>

    )
}